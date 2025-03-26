import fs from "fs";
import path from "path";

export async function GET(request) {
  const pdfPath = path.join(process.cwd(), "public/pdf/merged.pdf");
  if (!fs.existsSync(pdfPath)) {
    return new Response("File not found", { status: 404 });
  }
  const fileBuffer = fs.readFileSync(pdfPath);
  return new Response(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=merged.pdf",
    },
  });
}