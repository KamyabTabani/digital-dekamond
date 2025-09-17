"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {Loader2} from "lucide-react";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {LoginSchema, TLoginSchema} from "@/lib/validators";
import {fetchRandomUser} from "@/lib/api";
import {StoredUser} from "@/types";
import {handleDigitOnly, handleDigitOnlyPaste} from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [isLoadingPage, setIsLoadingPage] = useState(true);

    // Effect to check if the user is already logged in
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            // If user data exists, they are already logged in.
            toast.info("شما در حال حاضر لاگین هستید");
            router.replace("/dashboard"); // Redirect to dashboard
        } else {
            // If no user data, show the login page.
            setIsLoadingPage(false);
        }
    }, [router]);

    // Initialize the form with react-hook-form and Zod
    const form = useForm<TLoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            mobile: "",
        },
    });

    // Setup mutation for the login API call using React Query
    const {mutate, isPending: isSubmitting} = useMutation({
        mutationFn: fetchRandomUser,
        onSuccess: (data) => {
            // Format the user data received from the API
            const userToStore: StoredUser = {
                name: `${data.name.first} ${data.name.last}`,
                email: data.email,
                picture: data.picture.large,
            };

            // Store the formatted user data in localStorage
            localStorage.setItem("user", JSON.stringify(userToStore));

            toast.success("با موفقیت وارد شدید در حال انتقال ...");

            // Redirect to the dashboard page on successful login
            router.push("/dashboard");
        },
        onError: (error) => {
            // Handle any errors during the API call
            console.error("Login failed:", error);
            toast.error("ورود ناموفق بود لطفا مجددا امتحان نمایید");
        },
    });

    // Handler for form submission
    const onSubmit = (data: TLoginSchema) => {
        // This function is called only after successful validation
        console.log("Validated mobile number:", data.mobile);
        mutate(); // Execute the mutation (API call)
    };

    // While checking for existing session, show a loading spinner
    if (isLoadingPage) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary"/>
            </div>
        );
    }

    // Render the login form
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-lg md:text-2xl">ورود</CardTitle>
                <CardDescription className={"text-sm md:text-base"}>
                    برای ورود شماره موبایل خود را وارد نمایید
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
                                    <FormLabel className={"text-sm md:text-base"}>شماره موبایل</FormLabel>
                                    <FormControl>
                                        <Input
                                            maxLength={14}
                                            onKeyPress={(e) => {
                                                handleDigitOnly(e, {allowPlus: true})
                                            }}
                                            onPaste={(e) => {
                                                handleDigitOnlyPaste(e, {allowPlus: true})
                                            }}
                                            type="tel"
                                            placeholder="09xxxxxxxxx | +989xxxxxxxxx | 00989xxxxxxxxx"
                                            {...field}
                                            aria-invalid={!!form.formState.errors.mobile}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                            {isSubmitting && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            {isSubmitting ? "در حال ورود ..." : "ورود"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
