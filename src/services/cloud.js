"use server"
import cloudinary from "../cloudinary";

async function uploadImage(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "FileFlow/share", // Optional
    });
    console.log("Image URL:", result.secure_url);
    return result;
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

export default uploadImage;
