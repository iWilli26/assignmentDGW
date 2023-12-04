import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./globals.css";
import ResponsiveAppBar from "@/components/navbar";
import NextThemeProvider from "./ThemeProviderLayout";
import ReduxProvider from "@/Redux/ReduxProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, useAppSelector } from "@/Redux/store";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AssignmentDGW",
    description: "Sheeeesh",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReduxProvider>
                    <NextThemeProvider>
                        <ResponsiveAppBar />
                        {children}
                    </NextThemeProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
