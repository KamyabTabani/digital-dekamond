"use client";

import {useAuth} from "@/hooks/use-auth";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"; // We need to add this
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
        // This is a fallback, as the hook redirects.
        // It prevents rendering the component with null user data.
        return null;
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={user.picture} alt={user.name}/>
                    <AvatarFallback>
                        {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg md:text-3xl">خوش آمدی {user.name} !</CardTitle>
                <CardDescription className={"text-sm md:text-base"}>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <p className="mb-6 text-center text-muted-foreground text-base md:text-lg">
                    این صفحه ی داشبورد شما میباشد
                </p>
                <Button onClick={logout} className={"cursor-pointer"} variant="destructive">
                    خروج
                </Button>
            </CardContent>
        </Card>
    );
}
