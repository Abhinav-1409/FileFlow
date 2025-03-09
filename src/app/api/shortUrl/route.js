"use server"
import { NextResponse } from "next/server";

export async function POST(request) {
  const url = await request.json();
  try {
    const token = await Users.validateUserLogin(email, password);
    const response = NextResponse.json({error: 'success'},{status: 200});
    response.cookies.set("uid", token ,{ httpOnly: true, secure: true, path: "/" });
    return response;
  } catch (e) {
    return NextResponse.json({error : e.message},{status : 400});
  }
}