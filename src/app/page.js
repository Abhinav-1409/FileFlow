"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-3/4 mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        FileFlow Features
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image Processing Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Image Processing
          </h2>
          <p className="text-gray-600 mb-4">
            Resize images with options to adjust width, height and transformation,
            adjust quality, convert format, or remove background. Supports files
            up to 10MB.
          </p>
          <Link
            href="/images"
            className="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Learn More
          </Link>
        </div>

        {/* Video Processing Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Video Processing
          </h2>
          <p className="text-gray-600 mb-4">
            Resize &amp; crop videos, trim clips (with dynamic limits based on video
            duration), convert formats, and add subtitles. Supports files up to 25MB.
          </p>
          <Link
            href="/videos"
            className="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Learn More
          </Link>
        </div>

        {/* File Sharing Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Share Files</h2>
          <p className="text-gray-600 mb-4">
            Upload and share any file type up to 25MB and get a shortened URL for
            easy sharing.
          </p>
          <Link
            href="/share"
            className="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Learn More
          </Link>
        </div>

        {/* Images to PDF Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Images to PDF
          </h2>
          <p className="text-gray-600 mb-4">
            Convert your images to a high-quality PDF document. Merge multiple
            images to create a single PDF file.
          </p>
          <Link
            href="/pdf"
            className="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
