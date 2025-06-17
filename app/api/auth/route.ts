import { NextResponse } from "next/server";

const AUTH_URL = "https://sb.stack-ai.com/auth/v1/token?grant_type=password";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZic3VhZGZxaGtseG9rbWxodHNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM0NTg5ODAsImV4cCI6MTk4OTAzNDk4MH0.Xjry9m7oc42_MsLRc1bZhTTzip3srDjJ6fJMkwhXQ9s";

export async function POST() {
  
  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: {
      Apikey: ANON_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "stackaitest@gmail.com",
      password: "!z4ZnxkyLYs#vR",
    }),
  });

  const data = await res.text();

  return new NextResponse(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
