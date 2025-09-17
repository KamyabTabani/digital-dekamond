// src/hooks/use-auth.ts
"use client";

import {StoredUser} from "@/types";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {toast} from "sonner";

export function useAuth() {
    const router = useRouter();
    const [user, setUser] = useState<StoredUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            setUser(JSON.parse(userJson));
        } else {
            router.replace("/login");
        }
        setIsLoading(false);
    }, [router]);

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.replace("/login");
        toast.info("You have been logged out.");
    };

    return {user, logout, isLoading};
}
