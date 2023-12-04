"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Container } from "@mui/material";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";
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
import axios from "axios";
import { Pokemon } from "@/model/pokemon";

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [gen, setGen] = useState([] as Pokemon[]);
    useEffect(() => {
        (async () => {
            const johto = (
                await axios.get(
                    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
                )
            ).data;
            let pokemons: Pokemon[] = [];
            await johto.results.forEach(
                (element: { name: string; url: string }) => {
                    axios.get(element.url).then((res) => {
                        console.log(res.data);

                        pokemons.push(res.data);
                    });
                }
            );

            await Promise.all(
                johto.results.map(
                    async (element: { name: string; url: string }) => {
                        axios.get(element.url).then((res) => {
                            pokemons.push(res.data);
                        });
                    }
                )
            );

            console.log(pokemons);

            setGen(pokemons);
        })();
    }, []);

    useEffect(() => {
        console.log(gen);
        console.log(gen.length);
    }, [gen]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <p>insane dashboard</p>
        </Container>
    );
};

export default LoginForm;
