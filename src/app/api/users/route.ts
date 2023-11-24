import pool from "../db";
export async function GET() {
    const res = await pool.query(`SELECT * FROM "assignmentDGW".users`);
    console.log(res.rows);

    return Response.json(res.rows);
}

export async function POST(request: Request) {
    const res = await request.json();
    return Response.json({ data: res });
}
