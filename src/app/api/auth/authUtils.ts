import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/model/user";
import { serialize } from "cookie";

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10; // Adjust the cost factor as needed
    return await bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = async (user: User) => {
    const secret = (process.env.JWT_SECRET as string) || "secret";
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            iss: "assignmentDGW",
            iat: Date.now(),
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d",
        }
    );

    const serializedUser = serialize("user", token, {
        path: "/",
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        sameSite: "strict",
    });

    return { token, serializedUser };
};

export const verifyToken = async (token: string) => {
    try {
        const verifiedToken = await jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );
        return verifiedToken;
    } catch (e) {
        return null;
    }
};

export const refreshToken = async (token: string) => {
    const verifiedToken = await verifyToken(token);
    if (verifiedToken) {
        const user = verifiedToken as User;
        return await generateToken(user);
    } else {
        return null;
    }
};
