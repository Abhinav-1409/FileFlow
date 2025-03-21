const cloudinary = require("cloudinary").v2;
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
// import nextConnect from 'next-connect';
import { createRouter } from 'next-connect';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Configure Multer storage for raw files
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "raw_files",
      resource_type: "raw", // Allows any file type (PDF, ZIP, DOCX, etc.)
    },
  });
  
  const upload = multer({ storage });
  
  // Use createRouter instead of nextConnect
  const apiRoute = createRouter();
  
  apiRoute.use(upload.single("file"));
  
  apiRoute.post((req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
  
    return res.json({
      message: "File uploaded successfully",
      fileUrl: req.file.path, // Cloudinary URL
    });
  });
  
  export { apiRoute as POST };
  
  // Disable Edge runtime (Multer needs Node.js runtime)
  export const runtime = "nodejs";