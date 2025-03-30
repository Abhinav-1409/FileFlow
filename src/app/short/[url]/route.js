import { NextResponse } from "next/server";
import shortUrl from "@/models/shortUrls";
const URL = process.env.URL;
import connectDB from "@/services/connection";

export async function GET(request, context ) {
  await connectDB();
  const { params } = await context;
  const { url } = params;
  const shortedUrl = `${URL}/short/${url}`;
  // console.log(shortedUrl);
  const originalUrl = await shortUrl.findOne({ shortUrl: shortedUrl });
  return NextResponse.redirect(originalUrl.originalUrl);
}
