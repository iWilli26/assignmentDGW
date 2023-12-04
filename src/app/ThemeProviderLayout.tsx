"use client";
import { createTheme, ThemeProvider } from "@mui/material";
import router from "next/router";
import { useEffect } from "react";
import { getUser } from "./auth/authUtils";
const NextThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const fetchUser = async () => {
        try {
            const { user } = await getUser();
            if (user) {
                // setUsername(user.username);
                // setisAuth(true);
                console.log(user);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchUser();
    }, [router]);

    const defaultTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
export default NextThemeProvider;
