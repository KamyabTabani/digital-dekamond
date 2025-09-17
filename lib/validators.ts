import {z} from "zod";

// Regex for Iranian mobile numbers
// Supports: 09xxxxxxxxx, +989xxxxxxxxx, 00989xxxxxxxxx
const iranMobileRegex = /^(09|\+989|00989)\d{9}$/;

export const LoginSchema = z.object({
    mobile: z.string().regex(iranMobileRegex, {
        message: "فرمت شماره نادرست است",
    }),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;
