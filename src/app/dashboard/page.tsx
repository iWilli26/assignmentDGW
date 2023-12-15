import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Container, Grid } from "@mui/material";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";
import * as d3 from "d3";
import fetchCsv from "./fetchCsv";
import { CssBaseline } from "@mui/material";
import axios from "axios";
import fetchData from "./fetchCsv";
import { getUser } from "../auth/authUtils";
import { BarChart } from "./chart";
import Controller from "./controller";
import styles from "./chart.module.css";
import { Match } from "@/model/match";

const Dashboard: React.FC = async () => {
    const matches: Match[] = await fetchData();

    return (
        <div className={styles.wrapper}>
            <Controller matches={matches} />
        </div>
    );
};

export default Dashboard;
