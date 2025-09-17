// src/app/page.tsx
"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            router.replace("/dashboard");
        } else {
            router.replace("/login");
        }
    }, [router]);

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary"/>
        </div>
    );
}
