// src/app/(dashboard)/dashboard/page.tsx
"use client";

import {useAuth} from "@/hooks/use-auth";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Loader2} from "lucide-react";

export default function DashboardPage() {
    const {user, logout, isLoading} = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary"/>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="items-center text-center">
                    <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src={user.picture} alt={user.name}/>
                        <AvatarFallback>
                            {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl">Welcome, {user.name}!</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <p className="mb-6 text-center text-muted-foreground">
                        This is your protected dashboard.
                    </p>
                    <Button onClick={logout} variant="destructive">
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
