import React from "react";
import { Avatar, Container, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { CssBaseline } from "@mui/material";
import { getUser } from "../auth/authUtils";
import Profile from "./profile";
import axios from "axios";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const Dashboard: React.FC = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get("user")?.value;
    let verifiedToken: UserToken;
    if (token) {
        try {
            const verif = await jwt.verify(
                token,
                process.env.JWT_SECRET as string
            );
            verifiedToken = verif as UserToken;
            if (!verifiedToken) {
                return <div>Invalid token</div>;
            }
            return (
                <div>
                    <CssBaseline />
                    <Grid container>
                        <Profile user={verifiedToken} />
                    </Grid>
                </div>
            );
        } catch (err) {
            return (
                <div>
                    <CssBaseline />
                    <Profile user={{ id: -1 } as UserToken} />
                </div>
            );
        }
    }
};

export default Dashboard;
