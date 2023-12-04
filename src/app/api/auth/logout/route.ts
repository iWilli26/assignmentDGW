import { cookies } from "next/headers";

export async function GET(request: Request) {
    const cookieStore = cookies();
    cookieStore.delete("user");
    return Response.json({ message: "logged out" });
}
