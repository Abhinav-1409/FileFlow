"use server"
import cloudinary from "../cloudinary";

async function upload(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "FileFlow/share", // Optional
      resource_type: 'raw'
    });
    return result;
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

export default upload;
