import type {Metadata} from "next";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";
import {Providers} from "@/components/providers";
import localFont from "next/font/local";

const siteUrl = "https://digital-dekamond-eight.vercel.app/";

export const metadata: Metadata = {
    // Provides a template for page titles. Page-specific titles will be inserted where `%s` is.
    title: {
        template: "%s | Next.js Auth Demo",
        default: "Next.js Auth Demo", // A default title for pages that don't have one.
    },
    description: "A client-side authentication project demonstrating the use of Next.js, TypeScript, Tailwind CSS, and React Query.",

    // Keywords for SEO
    keywords: ["Next.js", "TypeScript", "Tailwind CSS", "React Query", "Authentication", "Frontend Developer"],

    // Information about the author
    authors: [{name: "Kamyab Tabani", url: "https://github.com/kamyabtabani"}],
    creator: "Kamyab Tabani",

    // For social media sharing (Open Graph)
    openGraph: {
        title: "Next.js Authentication Project",
        description: "A demonstration of client-side authentication.",
        url: siteUrl,
        siteName: "Next.js Auth Demo",
        // You should create an image (e.g., 1200x630px) and place it in your `public` folder.
        images: [
            {
                url: `${siteUrl}/og-image.png`, // Path to your Open Graph image
                width: 1200,
                height: 630,
                alt: "Project Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },

    // For Twitter sharing
    twitter: {
        card: "summary_large_image",
        title: "Next.js Authentication Project",
        description: "A demonstration of client-side authentication.",
        // The image for Twitter cards should also be specified.
        images: [`${siteUrl}/og-image.png`],
    },

    // The base URL for resolving relative paths in metadata
    metadataBase: new URL(siteUrl),

    // Favicons
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
};

const IranSansFont = localFont({
    src: [
        {
            path: './fonts/IranSans/IRANSansUltraLight.woff2',
            style: "normal",
            weight: "200"
        },
        {
            path: './fonts/IranSans/IRANSansLight.woff2',
            style: "normal",
            weight: "300"
        },
        {
            path: './fonts/IranSans/IRANSansNormal.woff2',
            style: "normal",
            weight: "400"
        },
        {
            path: './fonts/IranSans/IRANSansMedium.woff2',
            style: "normal",
            weight: "500"
        },
        {
            path: './fonts/IranSans/IRANSansBold.woff2',
            style: "normal",
            weight: "700"
        },
        {
            path: './fonts/IranSans/IRANSansBlack.woff2',
            style: "normal",
            weight: "900"
        },
    ],
    variable: '--font-iran-sans',
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" dir={"rtl"}>
        <body
            className={`${IranSansFont.className} antialiased`}
        >
        <Providers>
            <main
                className={"min-h-screen bg-background text-foreground flex flex-col items-center justify-center "}>{children}</main>
            <Toaster richColors toastOptions={{
                className: IranSansFont.className
            }}/>
        </Providers>
        </body>
        </html>
    );
}
