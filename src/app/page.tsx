import Image from "next/image";
import styles from "./page.module.css";
import { Container } from "@mui/material";
import { useAppSelector } from "@/Redux/store";
export default function Home() {
    return (
        <main className={styles.main}>
            <Container component="main" maxWidth="xs"></Container>
        </main>
    );
}
