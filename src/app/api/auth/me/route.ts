import { cookies } from "next/headers";
import { verifyToken } from "../authUtils";

export async function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get("user")?.value;
    if (!token) {
        return Response.json({ message: "not authenticated", status: 401 });
    } else {
        try {
            const verifiedToken = await verifyToken(token);
            return Response.json({ user: verifiedToken });
        } catch (e) {
            return Response.json({ message: "not authenticated", status: 401 });
        }
    }
}
