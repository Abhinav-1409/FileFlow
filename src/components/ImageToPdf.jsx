"use client";
import { useState, useEffect } from "react";
import { createPdf } from "../services/convertPdf";

export default function ImagesToPDF() {
  const [images, setImages] = useState([]); // Array of File objects
  const [previews, setPreviews] = useState([]); // Array of preview URLs
  const [pdfUrl, setPdfUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      // Optionally, validate file sizes here
      setImages(selectedFiles);
    } else {
      setImages([]);
    }
  };

  useEffect(() => {
    if (images.length > 0) {
      const newPreviews = images.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);

      return () => {
        newPreviews.forEach(url => URL.revokeObjectURL(url));
      };
    } else {
      setPreviews([]);
    }
  }, [images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return;
    setIsProcessing(true);
    
    const result = await createPdf(images);
    console.log(result);
    setPdfUrl(result);
    setIsProcessing(false);
  };

  return (
    <div className="p-6 bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Images to PDF
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Form Inputs */}
          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFilesChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                />
                <span className="text-sm text-gray-500">
                  You may upload multiple images. Allowed file size: max 10MB each.
                </span>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
              >
                {isProcessing ? "Processing..." : "Generate PDF"}
              </button>
            </form>
          </div>

          {/* Right Side: Previews & Download Option */}
          <div className="flex flex-col items-center justify-center">
            {previews.length > 0 ? (
              <div className="flex flex-wrap gap-4 mb-4 justify-center">
                {previews.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded shadow-md border"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No images selected</p>
            )}
            {pdfUrl && (
              <>
                <embed
                  src={pdfUrl}
                  type="application/pdf"
                  className="w-full max-w-md rounded-lg shadow-md border mb-4"
                />
                <a
                  href={pdfUrl}
                  download="images.pdf"
                  target="_blank"
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition"
                >
                  Download PDF
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}