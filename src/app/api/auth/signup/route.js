"use server";
import Users from '@/models/user';
import connectDB from '../../../../services/connection';
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const { email, password, name } = await request.json();
  // console.log(email,password,name);
  try {
    const user = await Users.create({ email: email, password: password, name: name });
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
