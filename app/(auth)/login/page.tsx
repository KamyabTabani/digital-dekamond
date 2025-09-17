// src/app/(auth)/login/page.tsx
"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {LoginSchema, TLoginSchema} from "@/lib/validators";

export default function LoginPage() {
    const form = useForm<TLoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            mobile: "",
        },
    });

    const onSubmit = (data: TLoginSchema) => {
        console.log("Validation successful:", data);
    };

    const isLoading = form.formState.isSubmitting;

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
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
