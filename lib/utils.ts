import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const handleDigitOnly = (
    event: React.KeyboardEvent<HTMLInputElement>,
    options?: { allowMinus?: boolean; allowPlus?: boolean }
) => {
    const {allowMinus = false, allowPlus = false} = options || {};
    const key = event.key;
    const input = event.currentTarget;
    const value = input.value;
    const selectionStart = input.selectionStart;

    // A list of non-preventable keys (e.g., navigation, deletion, etc.)
    const allowedKeys = [
        'Enter', 'Tab', 'Backspace', 'Delete',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'
    ];

    if (allowedKeys.includes(key) || event.ctrlKey || event.metaKey) {
        return; // Don't prevent default for control keys
    }

    // Check for invalid characters, sign rules, and dot rules
    if (
        // 1. Not a digit, dot, plus, or minus
        !/[\d.+-]/.test(key) ||

        // 2. The key is a sign ('+' or '-') but:
        ((key === '+' && !allowPlus) || (key === '-' && !allowMinus)) || // the specific sign is not allowed
        ((key === '+' || key === '-') && (selectionStart !== 0 || /[+-]/.test(value))) || // it's not at the start OR a sign already exists

        // 3. The key is a dot but a dot already exists
        (key === '.' && value.includes('.'))
    ) {
        event.preventDefault();
    }
};


export const handleDigitOnlyPaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    options?: { allowMinus?: boolean; allowPlus?: boolean }
) => {
    event.preventDefault();
    const {allowMinus = false, allowPlus = false} = options || {};

    const pasteData = event.clipboardData.getData('text');
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    const startPos = input.selectionStart || 0;
    const endPos = input.selectionEnd || 0;

    // Construct the string as if the paste happened
    const before = currentValue.slice(0, startPos);
    const after = currentValue.slice(endPos);
    const combined = before + pasteData + after;

    // 1. Remove all characters that are not digits, dots, plus, or minus
    let sanitized = combined.replace(/[^\d.+-]/g, '');

    // 2. Handle signs (+/-)
    let sign = '';
    // Check if the very first character is a sign that is allowed
    if (sanitized.startsWith('+') && allowPlus) {
        sign = '+';
    } else if (sanitized.startsWith('-') && allowMinus) {
        sign = '-';
    }
    // Remove ALL signs from the string, then add the allowed one back to the front
    sanitized = sign + sanitized.replace(/[+-]/g, '');


    // 3. Handle dots (.) - Only keep the first one
    const parts = sanitized.split('.');
    sanitized = parts.shift() + (parts.length ? '.' + parts.join('') : '');

    // Update the input value and cursor position
    input.value = sanitized;
    const newCursorPos = input.value.length - after.length;
    input.setSelectionRange(newCursorPos, newCursorPos);
};
