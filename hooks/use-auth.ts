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
        // This effect runs only on the client
        const userJson = localStorage.getItem("user");
        if (userJson) {
            setUser(JSON.parse(userJson));
        } else {
            // If no user, redirect to login
            router.replace("/login");
        }
        setIsLoading(false);
    }, [router]);

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.replace("/login");
        toast.info("شما خارج شدید");
    };

    return {user, logout, isLoading};
}
