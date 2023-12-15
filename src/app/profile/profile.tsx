"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    Autocomplete,
    Avatar,
    Box,
    Button,
    Collapse,
    Grid,
    TextField,
} from "@mui/material";
import { CssBaseline } from "@mui/material";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { Match } from "@/model/match";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import styles from "./chart.module.css";
import { deepPurple } from "@mui/material/colors";
import { getUser } from "../auth/authUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { clear } from "console";
import { get } from "http";
import axios from "axios";

type FormValues = {
    email?: string | undefined;
    password?: string | undefined;
    username?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
};

const Profile: React.FC<{ user: UserToken }> = (props): JSX.Element => {
    const router = useRouter();

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email is not valid")
            .required("Email is required"),
        password: Yup.string(),
        username: Yup.string().required("Username is required"),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
    });
    const [user, setUser] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        iss: "",
        exp: 0,
        iat: 0,
    } as UserToken);
    const [initials, setInitials] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
        mode: "onTouched",
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: "",
        },
    });

    useEffect(() => {
        setUser(props.user);
        setInitials(user.firstName.charAt(0) + user.lastName.charAt(0));
        console.log(props.user);

        let defaultValues = {
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            username: props.user.username,
            email: props.user.email,
            password: "",
        };
        reset({ ...defaultValues });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function randomColor() {
        let hex = Math.floor(Math.random() * 0xffffff);
        let color = "#" + hex.toString(16);

        return color;
    }

    const [showAlert, setShowAlert] = useState(false);

    const onSubmit = async (data: FormValues): Promise<void> => {
        try {
            const res = await axios.put("/api/users/" + user.id, data);
            const response = res.data;
            if (response.error !== null) {
                setError(response.error.field, {
                    type: "manual",
                    message: response.error.detail,
                });
                return;
            }
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } catch (e) {
            console.log(e);
        }
    };
    if (props.user.id == -1) {
        router.push("/auth/login");
        return (
            <div>
                <CssBaseline />
            </div>
        );
    }
    return (
        <div>
            <CssBaseline />
            {showAlert && (
                <Collapse in={showAlert}>
                    <Alert variant="outlined" severity="success">
                        Successfully updated{" "}
                    </Alert>
                </Collapse>
            )}

            <Grid
                container
                sx={{ minWidth: "100vw", minHeight: "100vh", padding: 2 }}
                flexDirection={"column"}
                alignItems={"center"}
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid item>
                    <Avatar
                        sx={{ width: 100, height: 100, mb: 2 }}
                        style={{ backgroundColor: randomColor(), fontSize: 40 }}
                    >
                        {initials}
                    </Avatar>
                </Grid>
                <Grid display={"flex"} flexDirection={"column"} width={"30rem"}>
                    <Grid sx={{ mb: 1 }} display={"flex"} flexDirection={"row"}>
                        <Grid
                            xs={3}
                            item
                            display={"flex"}
                            alignItems={"center"}
                        >
                            Username :
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                {...register("username")}
                                fullWidth
                                id="username"
                                name="username"
                                autoComplete="username"
                                value={user.username}
                                onChange={(e) => {
                                    setUser({
                                        ...user,
                                        username: e.target.value,
                                    });
                                }}
                                error={!!errors.username}
                                helperText={
                                    !!errors.username
                                        ? errors.username.message
                                        : ""
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid sx={{ mb: 1 }} display={"flex"} flexDirection={"row"}>
                        <Grid
                            xs={3}
                            item
                            display={"flex"}
                            alignItems={"center"}
                        >
                            Email :
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                {...register("email")}
                                fullWidth
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={(e) => {
                                    setUser({ ...user, email: e.target.value });
                                }}
                                autoComplete="email"
                                error={!!errors.email}
                                helperText={
                                    !!errors.email ? errors.email.message : ""
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid sx={{ mb: 1 }} display={"flex"} flexDirection={"row"}>
                        <Grid
                            xs={3}
                            item
                            display={"flex"}
                            alignItems={"center"}
                        >
                            Prénom :
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                {...register("firstName")}
                                fullWidth
                                id="firstName"
                                name="firstName"
                                value={user.firstName}
                                onChange={(e) => {
                                    setUser({
                                        ...user,
                                        firstName: e.target.value,
                                    });
                                }}
                                autoComplete="firstName"
                                error={!!errors.firstName}
                                helperText={
                                    !!errors.firstName
                                        ? errors.firstName.message
                                        : ""
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        sx={{ mb: 1 }}
                        item
                        xs={12}
                        display={"flex"}
                        flexDirection={"row"}
                    >
                        <Grid
                            item
                            xs={3}
                            display={"flex"}
                            alignItems={"center"}
                        >
                            Nom :
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                {...register("lastName")}
                                fullWidth
                                id="lastName"
                                name="lastName"
                                onChange={(e) => {
                                    setUser({
                                        ...user,
                                        lastName: e.target.value,
                                    });
                                }}
                                autoComplete="lastName"
                                value={user.lastName}
                                error={!!errors.lastName}
                                helperText={
                                    !!errors.lastName
                                        ? errors.lastName.message
                                        : ""
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid sx={{ mb: 1 }} display={"flex"} flexDirection={"row"}>
                        <Grid
                            item
                            xs={3}
                            display={"flex"}
                            alignItems={"center"}
                        >
                            Password :
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                {...register("password")}
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                autoComplete="password"
                                type="password"
                                error={!!errors.password}
                                helperText={
                                    !!errors.password
                                        ? errors.password.message
                                        : ""
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Button type="submit" variant="outlined">
                    Submit
                </Button>
            </Grid>
        </div>
    );
};

export default Profile;
