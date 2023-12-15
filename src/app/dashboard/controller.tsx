"use client";
import React, { useEffect, useRef, useState } from "react";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { BarChart } from "./chart";
import { Match } from "@/model/match";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

import styles from "./chart.module.css";

const Controller: React.FC<{ matches: Match[] }> = (props): JSX.Element => {
    const matches = props.matches;
    const {
        register,
        handleSubmit,
        setError,
        control,
        formState: { errors },
    } = useForm<{
        dateStart: dayjs.Dayjs | null;
        team: string | null;
        dateEnd: dayjs.Dayjs | null;
    }>({
        mode: "onTouched",
    });

    const [dateStart, setDateStart] = useState<Dayjs | null>(
        dayjs("2016-01-01")
    );
    const [dateEnd, setDateEnd] = useState<Dayjs | null>(dayjs("2024-01-01"));
    const [teamName, setTeamName] = useState<string | null>("");
    const [chartData, setChartData] = useState<
        { label: number; count: number }[]
    >([]);

    const teams = matches.reduce(
        (acc: string[], cur) => {
            if (!acc.includes(cur.team1)) {
                acc.push(cur.team1);
            }
            if (!acc.includes(cur.team2)) {
                acc.push(cur.team2);
            }
            return acc;
        },
        ["All"]
    );

    useEffect(() => {
        onSubmit({ dateStart: dateStart, dateEnd: dateEnd, team: teamName });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateStart, dateEnd, teamName]);

    const onSubmit: SubmitHandler<{
        dateStart: dayjs.Dayjs | null;
        dateEnd: dayjs.Dayjs | null;
        team: string | null;
    }> = (data): void => {
        let matchesOfATeam = matches.filter(
            (x) => x.team1 === teamName || x.team2 === teamName
        );
        if (data.team === "All" || data.team === "") {
            matchesOfATeam = matches;
        }

        const matchesBetweenDate = matchesOfATeam.filter(
            (x) =>
                dayjs(x.date).isAfter(data.dateStart!) &&
                dayjs(x.date).isBefore(data.dateEnd!)
        );

        if (dayjs(data.dateEnd).diff(data.dateStart, "year") < 3) {
            const matchesBetweenDateByMonth = matchesBetweenDate.reduce(
                (acc: { label: number; count: number }[], cur) => {
                    const year = dayjs(cur.date).year();
                    const month = dayjs(cur.date).month();
                    const index = acc.findIndex(
                        (x) => x.label === year * 100 + month
                    );
                    if (index === -1) {
                        acc.push({ label: year * 100 + month, count: 1 });
                    } else {
                        acc[index].count++;
                    }
                    return acc;
                },
                []
            );
            setChartData(matchesBetweenDateByMonth);
        } else {
            const matchesBetweenDateByYear = matchesBetweenDate.reduce(
                (acc: { label: number; count: number }[], cur) => {
                    const year = dayjs(cur.date).year();
                    const index = acc.findIndex((x) => x.label === year);
                    if (index === -1) {
                        acc.push({ label: year, count: 1 });
                    } else {
                        acc[index].count++;
                    }
                    return acc;
                },
                []
            );
            setChartData(matchesBetweenDateByYear);
        }
    };

    return (
        <div className={styles.wrapper}>
            <CssBaseline />
            <Grid container spacing={4}>
                <Grid item md={12} xs={12}>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 3 }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid container sx={{ ml: 2, mr: 2 }}>
                            <Grid item container xs={5} sx={{ mr: 2 }}>
                                <Grid item xs={5.5} sx={{ mr: 1 }}>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePicker
                                            label="Date Start"
                                            value={dayjs(dateStart)}
                                            onChange={(newDate) =>
                                                setDateStart(newDate)
                                            }
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={5.5}>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <DatePicker
                                            label="Date End"
                                            value={dayjs(dateEnd)}
                                            onChange={(newDate) =>
                                                setDateEnd(newDate)
                                            }
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} maxWidth={0.8}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={teams}
                                    defaultValue={"All"}
                                    sx={{ width: 300 }}
                                    {...register("team")}
                                    onChange={(event, value) => {
                                        setTeamName(value);
                                    }}
                                    renderInput={(params: any) => (
                                        <TextField {...params} label="Team" />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item md={6} xs={12} justifyContent="center">
                    <BarChart
                        data={chartData}
                        title={`Matches of ${teamName} between ${dayjs(
                            dateStart
                        ).format("L")} and ${dayjs(dateEnd).format("L")}`}
                        label="season"
                        value="count"
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Controller;
