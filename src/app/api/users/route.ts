export async function GET() {
  return Response.json([
    {
      firstName: "John",
      lastName: "Doe",
      email: "test@test.fr",
      password: "test",
      username: "johndoe",
    },
    {
      firstName: "Dohn",
      lastName: "Joe",
      email: "test2@test.fr",
      password: "test2",
      username: "dohnjoe",
    },
  ]);
}

export async function POST(request: Request) {
  const res = await request.json();
  return Response.json({ data: res });
}
