"use server"
import { getSession } from "next-auth/react";

export async function POST(request) {
    const session = await getSession({ req: request });
    console.log('session',session);
    const provider = session.provider;
    console.log('provider',provider);
    
    try {
      const shortenedUrl = shortUrl();
      const response = NextResponse.json({error: 'success'},{status: 200});
      response.cookies.set("uid", token ,{ httpOnly: true, secure: true, path: "/" });
      return response;
    } catch (e) {
      return NextResponse.json({error : e.message},{status : 400});
    }
  }