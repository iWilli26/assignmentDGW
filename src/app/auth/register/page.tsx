"use client";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../authUtils";

const RegisterForm: React.FC = () => {
    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                "Password must contain at least 8 characters, 1 uppercase letter, and 1 number"
            ),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password")], "Passwords do not match"),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        username: Yup.string().required("Username is required"),
        email: Yup.string()
            .required("Email is required")
            .email("Email is not valid"),
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ mode: "onTouched", resolver: yupResolver(formSchema) });

    const onSubmit = async (data: any) => {
        const register = await axios.post("/api/auth/register", data);
        console.log(register.data);
        if (!register.data.error) {
            await login(data);
            window.location.href = "/";
        } else if (register.data.error.field === "email") {
            setError("email", {
                type: "manual",
                message: register.data.error.detail,
            });
        } else if (register.data.error.field === "password") {
            setError("password", {
                type: "manual",
                message: register.data.error.detail,
            });
        } else if (register.data.error.field === "username") {
            setError("username", {
                type: "manual",
                message: register.data.error.detail,
            });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                {...register("firstName", {
                                    required: true,
                                    maxLength: 80,
                                })}
                                error={!!errors.firstName}
                                helperText={
                                    !!errors.firstName
                                        ? "First name is required"
                                        : ""
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                autoComplete="family-name"
                                {...register("lastName", {
                                    required: true,
                                    maxLength: 80,
                                })}
                                error={!!errors.lastName}
                                helperText={
                                    !!errors.lastName
                                        ? "Last name is required"
                                        : ""
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoComplete="username"
                                {...register("username", {
                                    required: true,
                                    maxLength: 80,
                                })}
                                error={!!errors.username}
                                helperText={
                                    errors.username?.type === "required"
                                        ? "Username is required"
                                        : errors.username?.type === "manual"
                                        ? errors.username.message
                                        : ""
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                {...register("email", {
                                    required: true,
                                    pattern: /\S+@\S+\.\S+/,
                                })}
                                error={!!errors.email}
                                helperText={
                                    errors.email?.type === "required"
                                        ? "Email is required"
                                        : errors.email?.type === "pattern"
                                        ? "Email is not valid"
                                        : errors.email?.type === "manual"
                                        ? errors.email.message
                                        : ""
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                {...register("password")}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                error={!!errors.password}
                                helperText={
                                    errors.password?.type === "required"
                                        ? "Password is required"
                                        : errors.password?.type === "matches"
                                        ? "Password must contain at least 8 characters, 1 uppercase letter, and 1 number"
                                        : ""
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="confirmPassword"
                                {...register("confirmPassword")}
                                error={!!errors.confirmPassword}
                                helperText={
                                    errors.confirmPassword?.type === "required"
                                        ? "Confirm Password is required"
                                        : errors.confirmPassword?.type ===
                                          "oneOf"
                                        ? "Passwords do not match"
                                        : ""
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/auth/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterForm;
