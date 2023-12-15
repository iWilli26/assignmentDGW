"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUser } from "../auth/authUtils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Redux/store";
import { useCookies } from "next-client-cookies";
import { loginRedux } from "@/Redux/features/authSlice";
import { getCookies } from "cookies-next";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const cookies = useCookies();
    useEffect(() => {
        (async () => {
            const user = await getUser();
            if (!user.user) {
                dispatch(loginRedux(user.user));
                router.push("/");
            }
        })();
    });
    return <main>{children}</main>;
}
