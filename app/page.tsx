"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";

/**
 * This is the main entry point of the application.
 * It checks the user's authentication status from localStorage
 * and redirects them to the appropriate page.
 */
export default function HomePage() {
    const router = useRouter();
    // We don't need a state here because the redirect will happen before the first paint.
    // However, a loading UI is best practice for a good user experience.

    useEffect(() => {
        // This code runs only on the client-side after the component mounts.
        const user = localStorage.getItem("user");

        if (user) {
            // If user data exists in localStorage, redirect to the dashboard.
            router.replace("/dashboard");
        } else {
            // If no user data, redirect to the login page.
            router.replace("/login");
        }
    }, [router]); // The empty dependency array ensures this effect runs only once.

    // Render a loading spinner while the check is being performed.
    // This prevents a flash of content before the redirect occurs.
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary"/>
        </div>
    );
}
