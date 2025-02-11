"use server";
import Users from "../../../models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password, name } = await request.json();
  console.log(email,password,name);
  try {
    const user = await Users.create({ email: email, password: password, name: name });
    console.log(user);
    return NextResponse.json(
      {
        message: "Successfully Registered. Login to Continue...",
      },
      {
        status: 201
      }
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
