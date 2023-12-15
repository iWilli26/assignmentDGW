"use client";
import React from "react";
import { CategoryScale, Chart, LinearScale, BarElement } from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement);
import { Bar } from "react-chartjs-2";
import styles from "./chart.module.css";
import "chart.js/auto";
import { Match } from "@/model/match";

export const BarChart = (props: {
    data: { label: number; count: number }[];
    label: string;
    value: string;
    title: string;
}) => {
    const option = {
        maintainsAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: props.title,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        var label = context.dataset.label || "";
                        if (label) {
                            label += ": ";
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    },
                },
            },
        },
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.chart}>
                <Bar
                    height={500}
                    width={500}
                    className="chart"
                    data={{
                        labels: props.data.map((x: any) => x.label),
                        datasets: [
                            {
                                label: "Matches",
                                data: props.data.map((x: any) => x.count),
                                backgroundColor: "rgba(255, 99, 132, 0.2)",
                                borderColor: "rgba(255, 99, 132, 1)",
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={option}
                />
            </div>
        </div>
    );
};
