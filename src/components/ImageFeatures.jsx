"use client";
import { useState, useEffect } from "react";
import { resize, qualityChange, convertFormat, bgRemove } from "../services/cloud";

export default function ImageProcess() {
  const [selectedFeature, setSelectedFeature] = useState("resize"); // Track selected feature
  const [file, setFile] = useState(null); // File input
  const [preview, setPreview] = useState(null); // Preview URL / processed image URL
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(300);
  const [quality, setQuality] = useState(80);
  const [autoQuality, setAutoQuality] = useState(false); // Auto quality toggle
  const [format, setFormat] = useState("webp");
  const [transformation, setTransformation] = useState("fit"); // Transformation option
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File size exceeds the maximum limit of 10MB.");
        return;
      }
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  useEffect(() => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = previewUrl;
      return () => {
        URL.revokeObjectURL(previewUrl);
      };
    } else {
      setPreview(null);
      setWidth(500);
      setHeight(300);
    }
  }, [file]);

  useEffect(() => {
    // Reset when feature changes
    setFile(null);
    setPreview(null);
    setWidth(500);
    setHeight(300);
  }, [selectedFeature]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    switch (selectedFeature) {
      case "resize":
        const dataResize = {
          image: file,
          width: width,
          height: height,
          crop: transformation,
        };
        resize(dataResize).then((result) => {
          // console.log(result);
          setPreview(result);
          setIsProcessing(false);
        });
        break;
      case "quality":
        const dataQuality = {
          image: file,
          quality: autoQuality ? "auto" : quality,
        };
        qualityChange(dataQuality).then((result) => {
          // console.log(result);
          setPreview(result);
          setIsProcessing(false);
        });
        break;
      case "convert":
        const dataConvert = {
          image: file,
          format: format,
        };
        convertFormat(dataConvert).then((result) => {
          // console.log(result);
          setPreview(result);
          setIsProcessing(false);
        });
        break;
      case "removebg":
        const dataRemove = {
          image: file,
        };
        bgRemove(dataRemove).then((result) => {
          // console.log(result);
          setPreview(result);
          setIsProcessing(false);
        });
        break;
      default:
        setIsProcessing(false);
        break;
    }
  };

  return (
    <div className="p-6 bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Image Processing
        </h1>

        {/* Feature Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedFeature("resize")}
            className={`px-6 py-3 rounded-lg border ${
              selectedFeature === "resize"
                ? "bg-gray-300"
                : "bg-gray-100"
            } hover:bg-gray-200 transition`}
          >
            Resize Image
          </button>
          <button
            onClick={() => setSelectedFeature("quality")}
            className={`px-6 py-3 rounded-lg border ${
              selectedFeature === "quality"
                ? "bg-gray-300"
                : "bg-gray-100"
            } hover:bg-gray-200 transition`}
          >
            Adjust Quality
          </button>
          <button
            onClick={() => setSelectedFeature("convert")}
            className={`px-6 py-3 rounded-lg border ${
              selectedFeature === "convert"
                ? "bg-gray-300"
                : "bg-gray-100"
            } hover:bg-gray-200 transition`}
          >
            Convert Format
          </button>
          <button
            onClick={() => setSelectedFeature("removebg")}
            className={`px-6 py-3 rounded-lg border ${
              selectedFeature === "removebg"
                ? "bg-gray-300"
                : "bg-gray-100"
            } hover:bg-gray-200 transition`}
          >
            Remove Background
          </button>
        </div>

        {/* Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Inputs */}
          <div>
            {selectedFeature === "resize" && (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  />
                  <span className="text-sm text-gray-500">
                    Allowed file size: max 10MB
                  </span>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 font-medium mb-2">
                      Width
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 font-medium mb-2">
                      Height
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Transformation
                  </label>
                  <select
                    value={transformation}
                    onChange={(e) => setTransformation(e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  >
                    <option value="scale">
                      Preserve Aspect Ratio (No distortion) - c_scale
                    </option>
                    <option value="fit">
                      Prevent Upscaling Beyond Original Size - c_fit
                    </option>
                    <option value="pad">
                      Add Background Instead of Stretching - c_pad
                    </option>
                    <option value="fill">
                      Make It Exactly Fit the Dimensions - c_fill
                    </option>
                  </select>
                  <p className="text-sm text-gray-500">
                    Choose how the image should be transformed.
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                >
                  {isProcessing ? "Processing..." : "Submit"}
                </button>
              </form>
            )}

            {selectedFeature === "quality" && (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  />
                  <span className="text-sm text-gray-500">
                    Allowed file size: max 10MB
                  </span>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Quality
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    disabled={autoQuality}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">
                    Selected Quality: {quality}
                  </span>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="autoQuality"
                      checked={autoQuality}
                      onChange={(e) => setAutoQuality(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="autoQuality" className="text-gray-700">
                      Auto Quality
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                >
                  {isProcessing ? "Processing..." : "Submit"}
                </button>
              </form>
            )}

            {selectedFeature === "convert" && (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  />
                  <span className="text-sm text-gray-500">
                    Allowed file size: max 10MB
                  </span>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Convert To
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  >
                    <option value="webp">WebP</option>
                    <option value="jpg">JPG</option>
                    <option value="png">PNG</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                >
                  {isProcessing ? "Processing..." : "Submit"}
                </button>
              </form>
            )}

            {selectedFeature === "removebg" && (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                  />
                  <span className="text-sm text-gray-500">
                    Allowed file size: max 10MB
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                >
                  {isProcessing ? "Processing..." : "Remove Background"}
                </button>
              </form>
            )}
          </div>

          {/* Right Side: Image Preview & Download Option */}
          <div className="flex flex-col items-center justify-center">
            {preview ? (
              <>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-w-md rounded-lg shadow-md border mb-4"
                />
                <a
                  href={preview}
                  download
                  target="_blank"
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition"
                >
                  Download Image
                </a>
              </>
            ) : (
              <p className="text-gray-500">No image selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}