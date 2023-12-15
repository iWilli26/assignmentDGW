import { User } from "@/model/user";
import axios from "axios";
import { comparePasswords } from "../authUtils";
import { generateToken, verifyToken } from "../authUtils";

export async function POST(request: Request) {
    const userRequest = await request.json();
    const users: User[] = (await axios.get("http://localhost:3000/api/users"))
        .data;
    const userToLogin = JSON.parse(userRequest.body);
    const user = users.find(
        (user) =>
            user.email === userToLogin.email ||
            user.username === userToLogin.email
    );

    if (!user) {
        return Response.json({
            error: { field: "email", detail: "email not found" },
        });
    } else {
        const passwordMatch = await comparePasswords(
            userToLogin.password,
            user.password
        );
        if (!passwordMatch) {
            return Response.json({
                error: { field: "password", message: "password is incorrect" },
            });
        } else {
            const { serializedUser } = await generateToken(user);
            const response = {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user.id,
            };
            return new Response(JSON.stringify(response), {
                headers: {
                    "Content-Type": "application/json",
                    "Set-Cookie": serializedUser,
                },
                status: 200,
            });
        }
    }
}
