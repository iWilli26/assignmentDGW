"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Container } from "@mui/material";
import Link from "@mui/material/Link";
import { getUser, login } from "../authUtils";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/Redux/store";
import {
    CssBaseline,
    Box,
    Avatar,
    Typography,
    Grid,
    TextField,
    Button,
    createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginRedux } from "@/Redux/features/authSlice";
import { useSelector } from "react-redux";
const LoginForm: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const userRedux = useAppSelector((state) => state.authReducer.user);
    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Email is not valid"),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                "Password must contain at least 8 characters, 1 uppercase letter, and 1 number"
            ),
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onTouched",
    });

    const onSubmit = async (data: {
        email: string;
        password: string;
    }): Promise<void> => {
        const res = await login(data);
        console.log(res);

        if (res?.email.error) {
            setError("email", {
                type: "manual",
                message: res.email.message,
            });
            return;
        } else if (res?.password.error) {
            setError("password", {
                type: "manual",
                message: res.password.message,
            });
            return;
        }
        const me = await getUser();
        dispatch(loginRedux(me.user));
        router.push("/");
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <h1>Username : {userRedux?.username}</h1>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 3 }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={!!errors.email}
                                {...register("email")}
                                helperText={
                                    !!errors.email ? errors.email.message : ""
                                }
                                fullWidth
                                id="email"
                                label="Email Address or Username"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                {...register("password")}
                                error={!!errors.password}
                                helperText={
                                    !!errors.password
                                        ? errors.password.message
                                        : ""
                                }
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/auth/register" variant="body2">
                                Don't have an account yet ? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;
