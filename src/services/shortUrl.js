"use server";
import { randomBytes } from "crypto";
import ShortUrl from "../models/shortUrls";
const url = process.env.URL;
import connectDB from "./connection";

export async function generateRandomString  (length) {
  const randomString = randomBytes(length).toString("base64").slice(0, length);
  return randomString;
};

const generateShortUrl = () => {
  let short = "";
  do {
    short = randomBytes(6).toString("base64").slice(0, 6);
  } while (short.includes("/"));
  const shortUrl = `${url}/short/${short}`;
  return shortUrl;
};

export async function shortUrl (originalUrl) {
  let short = "";
  let existingUrl;
  await connectDB();
  do {
    short = generateShortUrl();
    existingUrl = await ShortUrl.findOne({ shortUrl: short }); 
  } while (existingUrl != null);
  const newUrl = await ShortUrl.create({
    originalUrl,
    shortUrl: short,
  });
  return newUrl.shortUrl;
};
