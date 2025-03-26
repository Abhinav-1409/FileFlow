// "use server"
// import ILovePDFApi from "@ilovepdf/ilovepdf-nodejs";
// import { uploadMultipleImages } from "@/services/cloud";
// import fs from "fs";
// import path from "path";

// const instance = new ILovePDFApi(
//   process.env.ILP_PUBLIC_ID,
//   process.env.ILP_SECRET_KEY
// );

// export async function createPdf(images) {
//   // Get image URLs from your upload function
//   const imageUrls = await uploadMultipleImages(images);
//   console.log("Image URLs:", imageUrls, typeof imageUrls);

//   // Create an array of URLs from the returned objects
//   const urlsArray = imageUrls.map(item => typeof item === "string" ? item : item.url);
//   console.log("URLs Array:", urlsArray);

//   // Create a new task using the proper task type (e.g., "jpg2pdf")
//   const task = instance.newTask("merge");
//   await task.start();

//   // Add each image URL to the task
//   for (const imageUrl of urlsArray) {
//     await task.addFile(imageUrl);
//   }

//   // Process the task
//   await task.process();
//   console.log("Task processed:", task);

//   // Download the processed PDF as a Buffer
//   const pdfBuffer = await task.download();
//   console.log("PDF Buffer received, length:", pdfBuffer.length);

//   // Ensure the destination folder exists
//   const pdfFolder = path.join(process.cwd(), "public", "pdf");
//   if (!fs.existsSync(pdfFolder)) {
//     fs.mkdirSync(pdfFolder, { recursive: true });
//   }

//   // Define the full output path
//   const outputPath = path.join(pdfFolder, "merged.pdf");

//   // Write the Buffer to disk
//   fs.writeFileSync(outputPath, pdfBuffer);
//   console.log("✅ PDF saved at:", outputPath);

//   return outputPath;
// }
"use server";
import { uploadMultipleImages } from "@/services/cloud";
// export async function createPdf(images) {
//   // const uploadedImages = await uploadMultipleImages(images);
//   const uploadedImages = await uploadMultipleImages(images);
//   const imageUrls = uploadedImages.map((image) => image.url);
//   console.log("Image URLs Array:", imageUrls);

//   const pdfUrl = `https://res.cloudinary.com/${
//     process.env.CLOUD_NAME
//   }/image/upload/fl_attachment/${imageUrls.join(",")}.pdf`;

//   console.log("PDF URL:", pdfUrl);
//   return pdfUrl;
// }
import cloudinary from "../cloudinary";
import { generateRandomString } from "./shortUrl";
export async function createPdf(images) {
  try {
    const tag = await generateRandomString(6);
    // images.tag = tag;
    const uploadedImages = await uploadMultipleImages(images, tag);
    const imageUrls = uploadedImages.map((image) => image.url);
    // console.log("Image URLs Array:", imageUrls);

    // console.log("Uploaded Image IDs:", uploadedImages);

    // Create a PDF archive from the uploaded images
    // const pdfResponse = await cloudinary.uploader.create_archive({
    //   resource_type: "image",
    //   type: "upload",
    //   format: "pdf", // Convert images into a PDF
    //   public_ids: imageUrls, // Use the uploaded images
    //   flatten_folders: true, // Optional: keeps images flat in the archive
    // });
    const pdfF = await cloudinary.uploader
      .multi(tag, {
        format: "pdf",
        transformation: [
          { width: 800, crop: "scale" }, // Reduce size
          { quality: "auto:low" }, // Lower quality
        ],
      })
      // console.log("PDF Response:", pdfF);
      return pdfF.url;
      // .then((result) => {
      //   console.log(result);
      //   return result;
      // });
  } catch (error) {
    console.error("Error creating PDF:", error);
    throw error;
  }
}
