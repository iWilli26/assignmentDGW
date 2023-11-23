import axios from "axios";
import { User } from "@/model/user";
export async function POST(request: Request) {
  const res: User = await request.json();
  console.log(res);

  const test = await emailAlreadyUsed(res.email);
  console.log(test);

  return test
    ? Response.json({ error: "Email already used" })
    : Response.json({ data: res });
}

async function emailAlreadyUsed(email: string) {
  const users: User[] = await axios.get("/api/users").then((res) => res.data);

  return users.some((user) => user.email === email);
}
