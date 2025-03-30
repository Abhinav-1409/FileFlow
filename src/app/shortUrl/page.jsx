"use client";
import { useState } from "react";
import { shortUrl } from "@/services/shortUrl";

export default function UrlShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortenedUrl("");
    if (!longUrl) {
      setError("Please enter a URL to shorten.");
      return;
    }
    setIsProcessing(true);
    try {
      const result = await shortUrl(longUrl);
      if (result.error) {
        setError(result.error.message);
      } else {
        setShortenedUrl(result);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while shortening the URL.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-16 bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          URL Shortener
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Enter URL
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring-gray-500 focus:border-gray-500"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
          >
            {isProcessing ? "Shortening..." : "Shorten URL"}
          </button>
        </form>
        {shortenedUrl && (
          <div className="mt-6 p-4 bg-green-100 rounded">
            <p className="text-green-800">
              Your shortened URL is:{" "}
              <a
                href={shortenedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {shortenedUrl}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}