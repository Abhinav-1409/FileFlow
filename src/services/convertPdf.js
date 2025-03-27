"use server";
import { uploadMultipleImages } from "@/services/cloud";
import cloudinary from "../cloudinary";
import { generateRandomString } from "./shortUrl";

export async function createPdf(images) {
  try {
    const tag = await generateRandomString(6);
    const uploadedImages = await uploadMultipleImages(images, tag);
    const imageUrls = uploadedImages.map((image) => image.url);

    const pdfF = await cloudinary.uploader.multi(tag, {
      format: "pdf",
      transformation: [{ width: 800, crop: "scale" }, { quality: "auto:low" }],
    });
    return pdfF.url;
  } catch (error) {
    console.error("Error creating PDF:", error);
    throw error;
  }
}