"use client";
import { createTheme, ThemeProvider } from "@mui/material";
import router from "next/router";
import { useEffect } from "react";
import { getUser } from "./auth/authUtils";
const NextThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const defaultTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
export default NextThemeProvider;
