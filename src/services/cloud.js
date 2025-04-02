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
  const uploadData = await upload(data.image);
  // console.log(uploadData);
  if (uploadData.error) return uploadData;

  const response = await cloudinary.uploader.upload(uploadData.url, {
    width: data.width,
    height: data.height,
    crop: data.crop,
  });

  cloudinary.uploader.destroy(uploadData.public_id);

  // console.log(response);
  return response.url;
}

export async function resizeVideo(data) {
  const uploadData = await upload(data.video);
  // console.log(uploadData);
  if (uploadData.error) return uploadData;

  const response = await cloudinary.uploader.upload(uploadData.url, {
    resource_type: "video",
    width: data.width,
    height: data.height,
    crop: data.crop,
  });

  cloudinary.uploader.destroy(uploadData.public_id);

  // console.log(response);
  return response.url;
}

export async function qualityChange(data) {
  const uploadData = await upload(data.image);
  // console.log(uploadData);
  if (uploadData.error) return uploadData;

  const response = await cloudinary.uploader.upload(uploadData.url, {
    quality: data.quality,
  });

  cloudinary.uploader.destroy(uploadData.public_id);

  // console.log(response);
  return response.url;
}

export async function convertFormat(data) {
  const uploadData = await upload(data.image);
  // console.log(uploadData);
  if (uploadData.error) return uploadData;

  const response = await cloudinary.uploader.upload(uploadData.url, {
    format: data.format,
  });
  cloudinary.uploader.destroy(uploadData.public_id);
  // console.log(response);
  return response.url;
}

export async function bgRemove(data) {
  const uploadData = await upload(data.image);
  // console.log(uploadData);
  if (uploadData.error) return uploadData;

  const response = await cloudinary.uploader.upload(uploadData.url, {
    background_removal: "cloudinary_ai",
    format: "png",
  });
  cloudinary.uploader.destroy(uploadData.public_id);
  // console.log(response);
  // https://res.cloudinary.com/dwadgr8xu/image/upload/nbqnepunmmiqusghas2t.png
  return `https://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/${response.public_id}.png`;
}

export async function trim(data) {
  const uploadData = await upload(data.video);
  // console.log(uploadData);
  if (uploadData.error) return uploadData;

  const response = await cloudinary.uploader.upload(uploadData.url, {
    resource_type: "video",
    start_offset: data.start,
    end_offset: data.end,
    // format: "mp4",
  });
  cloudinary.uploader.destroy(uploadData.public_id);
  // console.log(response);
  return response.url;
}

export async function convertVideo(data) {
  const uploadData = await upload(data.video);
  // console.log(uploadData);
  if (uploadData.error) return uploadData;

  const response = await cloudinary.uploader.upload(uploadData.url, {
    resource_type: "video",
    format: data.format,
  });
  cloudinary.uploader.destroy(uploadData.public_id);
  // console.log(response);
  return response.url;
}

export async function uploadMultipleImages(images, tag) {
  // console.log(tag, typeof tag);
  let uploadedImages = [];
  for (const image of images) {
    try {
      // console.log(tag, typeof tag);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "FileFlow"); // Public preset
      formData.append("resource_type", "image"); // Accepts all file types
      formData.append("public_id", `${image.name}-${Date.now()}`);
      formData.append("quality", "auto");
      formData.append("tags", String(tag)); 

      // console.log(formData);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      // console.log(data);
      uploadedImages.push(data);
      // console.log(`Uploaded: ${data.url}`);
    } catch (e) {
      console.error("Cloudinary Upload Error:", e);
    }
  }
  return uploadedImages;
}
