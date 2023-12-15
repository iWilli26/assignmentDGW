import { hashPassword, comparePasswords } from "../authUtils";
import pool from "../../db";
import { User } from "@/model/user";
import axios from "axios";
export async function POST(request: Request) {
    const userToCreate: User = await request.json();

    const users: User[] = (await axios.get("http://localhost:3000/api/users"))
        .data;

    const emailAlreadyUsed = users.find(
        (user) => user.email === userToCreate.email
    );
    const usernameAlreadyUsed = users.find(
        (user) => user.username === userToCreate.username
    );

    if (emailAlreadyUsed) {
        return Response.json({
            error: { field: "email", detail: "email already in use" },
        });
    } else if (usernameAlreadyUsed) {
        return Response.json({
            error: { field: "username", detail: "Username already taken" },
        });
    } else {
        userToCreate.password = await hashPassword(userToCreate.password);
        await pool.query(
            `INSERT INTO "assignmentDGW".users (username, email, password, "firstName", "lastName") VALUES ('${userToCreate.username}','${userToCreate.email}', '${userToCreate.password}', '${userToCreate.firstName}', '${userToCreate.lastName}')`
        );

        return Response.json({ data: userToCreate });
    }
}
