import { cache } from "react";
import * as d3 from "d3";
import "server-only";
import { Match } from "@/model/match";

const fetchData = cache(async () => {
    const res = (await d3.csv(
        "https://projects.fivethirtyeight.com/soccer-api/club/spi_matches.csv"
    )) as Match[];
    return res;
});

export default fetchData;
