import { User } from "@/model/user";
import pool from "../../db";
import { hashPassword, comparePasswords } from "../../auth/authUtils";

export async function GET(request: Request) {
    const id = request.url.split("users/")[1];

    const res = await pool.query(
        `SELECT * FROM "assignmentDGW".users WHERE "assignmentDGW".users.id = $1`,
        [id]
    );
    return Response.json(res.rows);
}

export async function PUT(request: Request) {
    const data: User = await request.json();
    const id = request.url.split("users/")[1];

    const users = await pool.query(`SELECT * FROM "assignmentDGW".users`);

    if (data.email === "" || data.username === "") {
        return Response.json(
            {
                data: {},
                error: {
                    field: "email",
                    detail: "email or username cannot be empty",
                },
            },
            { status: 200 }
        );
    }

    if (
        users.rows.find(
            (user) => user.username === data.username && user.id === id
        )
    ) {
        return Response.json(
            {
                data: {},
                error: { field: "username", detail: "Username already exist" },
            },
            { status: 200 }
        );
    }

    if (
        users.rows.find((user) => user.email === data.email && user.id === id)
    ) {
        return Response.json(
            {
                data: {},
                error: { field: "email", detail: "Email already exist" },
            },
            { status: 200 }
        );
    }

    if (data.password) {
        const hashedPassword = await hashPassword(data.password);
        const res = await pool.query(
            `UPDATE "assignmentDGW".users SET username = '${data.username}', email = '${data.email}', "firstName" = '${data.firstName}', "lastName" = '${data.lastName}', password = '${hashedPassword}' WHERE "assignmentDGW".users.id = ${id}`
        );
        return Response.json({ data: res, error: null }, { status: 200 });
    }

    const res = await pool.query(
        `UPDATE "assignmentDGW".users SET username = '${data.username}', email = '${data.email}', "firstName" = '${data.firstName}', "lastName" = '${data.lastName}' WHERE "assignmentDGW".users.id = ${id}`
    );

    return Response.json({ data: res, error: null }, { status: 200 });
}
