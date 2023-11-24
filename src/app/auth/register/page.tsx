"use client";
import axios from "axios";
import React, { use, useState } from "react";
import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { error } from "console";
const RegisterForm: React.FC = () => {
    const [registerForm, setRegisterForm] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState({
        email: { error: false, message: "" },
        username: { error: false, message: "" },
        firstName: { error: false, message: "" },
        lastName: { error: false, message: "" },
        password: { error: false, message: "" },
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(registerForm);

        let temp = {
            ...error,
        };
        for (const key in registerForm) {
            if (registerForm[key as keyof typeof registerForm] === "") {
                const tempError = {
                    error: true,
                    message: `${
                        key.charAt(0).toUpperCase() + key.slice(1)
                    } cannot be empty`,
                };
                temp = {
                    ...temp,
                    [key]: tempError,
                };
                setError(temp);
            } else {
                const tempError = {
                    error: false,
                    message: "",
                };
                temp = {
                    ...temp,
                    [key]: tempError,
                };
            }
        }

        setError(temp);

        console.log(error);
        if (!error.password.error) {
            if (registerForm.password !== registerForm.confirmPassword) {
                const passwordError = {
                    error: true,
                    message: "Passwords do not match",
                };
                setError({ ...error, password: passwordError });
            } else {
                const passwordError = {
                    error: false,
                    message: "",
                };
                setError({ ...error, password: passwordError });
            }
        }

        axios
            .post("/api/auth/register", registerForm, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                if (response.data.error) {
                    if (response.data.error.field !== "email") {
                        setError({
                            ...error,
                            email: { error: false, message: "" },
                            username: {
                                error: true,
                                message: response.data.error.detail,
                            },
                        });
                    } else if (response.data.error.field !== "username") {
                        setError({
                            ...error,
                            username: { error: false, message: "" },
                            email: {
                                error: true,
                                message: response.data.error.detail,
                            },
                        });
                    }
                } else {
                    //everything is good
                    setError({
                        email: { error: false, message: "" },
                        username: { error: false, message: "" },
                        firstName: { error: false, message: "" },
                        lastName: { error: false, message: "" },
                        password: { error: false, message: "" },
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
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
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleChange}
                                    error={!!error.firstName.error}
                                    helperText={
                                        !!error.firstName.error
                                            ? error.firstName.message
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
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handleChange}
                                    error={!!error.lastName.error}
                                    helperText={
                                        !!error.lastName.error
                                            ? error.lastName.message
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
                                    name="username"
                                    autoComplete="username"
                                    onChange={handleChange}
                                    error={!!error.username.error}
                                    helperText={
                                        !!error.username.error
                                            ? error.username.message
                                            : ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    error={!!error.email.error}
                                    helperText={
                                        !!error.email.error
                                            ? error.email.message
                                            : ""
                                    }
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    error={!!error.password.error}
                                    helperText={
                                        !!error.password.error
                                            ? error.password.message
                                            : ""
                                    }
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="confirmPassword"
                                    onChange={handleChange}
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
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
// const divContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     align-items: center;
//     padding: 6rem;
//     min-height: 100vh;
// `;

const Submit = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export default RegisterForm;
