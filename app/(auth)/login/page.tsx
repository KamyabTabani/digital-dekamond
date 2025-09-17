// src/app/(auth)/login/page.tsx
"use client";

// React and Next.js imports
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

// Library imports
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {Loader2} from "lucide-react";
import {toast} from "sonner";

// Local component imports from Shadcn
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

// Custom local imports
import {LoginSchema, TLoginSchema} from "@/lib/validators";
import {fetchRandomUser} from "@/lib/api";
import {StoredUser} from "@/types";

export default function LoginPage() {
    const router = useRouter();
    const [isLoadingPage, setIsLoadingPage] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            toast.info("You are already logged in.");
            router.replace("/dashboard");
        } else {
            setIsLoadingPage(false);
        }
    }, [router]);

    const form = useForm<TLoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            mobile: "",
        },
    });

    const {mutate, isPending: isSubmitting} = useMutation({
        mutationFn: fetchRandomUser,
        onSuccess: (data) => {
            const userToStore: StoredUser = {
                name: `${data.name.first} ${data.name.last}`,
                email: data.email,
                picture: data.picture.large,
            };
            localStorage.setItem("user", JSON.stringify(userToStore));
            toast.success("Login successful! Redirecting...");
            router.push("/dashboard");
        },
        onError: (error) => {
            console.error("Login failed:", error);
            toast.error("Login failed. Please try again later.");
        },
    });

    const onSubmit = (data: TLoginSchema) => {
        mutate();
    };

    if (isLoadingPage) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary"/>
            </div>
        );
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your Iranian mobile number to login.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Mobile Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="09123456789"
                                            {...field}
                                            aria-invalid={!!form.formState.errors.mobile}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
