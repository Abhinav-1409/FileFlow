"use client"
import { useState } from "react";
import Image from "next/image";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUploadedUrl(data.url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      {preview && <Image src={preview} alt="Preview" className="w-full mb-2 rounded-lg" width={100} height={100}/>}
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <Image src={uploadedUrl} alt="Uploaded" className="w-full rounded-lg" width={100} height={100} />
          <p className="break-all">{uploadedUrl}</p>
        </div>
      )}
    </div>
  );
}
