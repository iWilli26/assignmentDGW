"use client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUser } from "./authUtils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Redux/store";
import { loginRedux } from "@/Redux/features/authSlice";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        (async () => {
            const user = await getUser();

            if (user.user) {
                dispatch(loginRedux(user.user));
                router.push("/");
            }
        })();
    });
    return <main>{children}</main>;
}
