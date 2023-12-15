import pool from "../db";
export async function GET() {
    console.log(pool);

    const res = await pool.query(`SELECT * FROM "assignmentDGW".users`);
    return Response.json(res.rows);
}

export async function POST(request: Request) {
    const res = await request.json();
    return Response.json({ data: res });
}
