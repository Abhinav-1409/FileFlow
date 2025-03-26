"use server"
import ILovePDFApi from "@ilovepdf/ilovepdf-nodejs";
import { uploadMultipleImages } from "@/services/cloud";
import fs from "fs";
import path from "path";

const instance = new ILovePDFApi(
  process.env.ILP_PUBLIC_ID,
  process.env.ILP_SECRET_KEY
);

export async function createPdf(images) {

  const imageUrls = await uploadMultipleImages(images);
  console.log("Image URLs:", imageUrls, typeof imageUrls);

  const task = instance.newTask("merge");
    await task.start();

    for (const imageUrl of imageUrls) {
      await task.addFile(imageUrl);
    }

    await task.process();
    console.log("task:", task);
    const pdfBuffer = await task.download();
    console.log("PDF Buffer:", pdfBuffer);
    const pdfFolder = path.join(process.cwd(), "public", "pdf");
    if (!fs.existsSync(pdfFolder)) {
      fs.mkdirSync(pdfFolder, { recursive: true });
    }
    const outputPath = path.join(pdfFolder, "merged.pdf");
    fs.writeFileSync(outputPath, pdfBuffer);

    console.log("✅ PDF saved at:", outputPath);
    return outputPath;
  }
