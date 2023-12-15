import { cookies } from "next/headers";
import { verifyToken } from "../authUtils";

export async function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get("user")?.value;
    const verifiedToken = await verifyToken(token);

    if (!verifiedToken) {
        return Response.json({ message: "not authenticated", status: 401 });
    } else {
        try {
            return Response.json({ user: verifiedToken });
        } catch (e) {
            return Response.json({ message: "not authenticated", status: 401 });
        }
    }
}
