"use client";
import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { AppDispatch, useAppSelector } from "@/Redux/store";
import { useDispatch } from "react-redux";
import { logoutRedux } from "@/Redux/features/authSlice";

const LoginForm: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const user = useAppSelector((state) => state.authReducer.user);
    useEffect(() => {
        (async () => {
            dispatch(logoutRedux());
            await fetch("/api/auth/logout");
            router.refresh();
            router.push("/auth/login");
        })();
    }, []);

    return <Container component="main" maxWidth="xs"></Container>;
};

export default LoginForm;
