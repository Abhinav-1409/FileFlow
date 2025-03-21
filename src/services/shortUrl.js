"use server";
import { randomBytes } from "crypto";
import ShortUrl from "../models/shortUrls";
const url = "http://localhost:3000";
import connectDB from "./connection";

const generateShortUrl = () => {
  const short = randomBytes(6).toString("base64").slice(0, 6);
  const shortUrl = `${url}/short/${short}`;
  return shortUrl;
};

const shortUrl = async function (originalUrl) {
  let short;
  let existingUrl;
  await connectDB();
  do {
    short = generateShortUrl();
    existingUrl = await ShortUrl.findOne({ shortUrl: short }); // ✅ Await the DB call
    console.log(existingUrl, short);
  } while (existingUrl != null);
  const newUrl = await ShortUrl.create({
    originalUrl,
    shortUrl: short,
  });
  return newUrl.shortUrl;
};
export default shortUrl;
