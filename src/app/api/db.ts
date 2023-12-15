//make a postgre connection in typescript and export it using .env file
import { Pool } from "pg";
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5430;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: port,
});
export default pool;
