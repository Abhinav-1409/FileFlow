"use server";
import cloudinary from "../cloudinary";

export async function upload(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "FileFlow"); // Public preset
  formData.append("resource_type", "raw"); // Accepts all file types
  formData.append("public_id", file.name); // Keeps original filename
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return { error: "Failed to upload file" };
  }
}

export async function resize(data) {
  const response = await fetch(
    `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/w_${data.width},h_${data.height},${data.crop}/${data.image}`
  );
  console.log(response);
  return response.url;
}
