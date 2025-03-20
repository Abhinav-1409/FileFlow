"use client";
import { useState } from "react";

export default function Share() {
    const [file, setFile] = useState(null);
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 25 * 1024 * 1024) {
                setError("File exceeds maximum size of 25MB.");
                setFile(null);
                return;
            }
            setError("");
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    // Simulate API call to generate shortened URL
    const shortenUrl = async (fileUrl) => {
        // In a real app, call your backend here.
        return "https://short.url/" + Math.random().toString(36).substring(2, 8);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please select a file to share.");
            return;
        }
        // For demo purposes, use the object URL as the file URL.
        const fileUrl = URL.createObjectURL(file);
        const url = await shortenUrl(fileUrl);
        setShortUrl(url);
        URL.revokeObjectURL(fileUrl);
    };

    return (
        <div className="p-16 bg-gray-100 flex flex-col items-center">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Share Your File
                </h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Upload File
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                        />
                        <span className="text-sm text-gray-500">
                            Allowed file size: max 25MB
                        </span>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                    >
                        Share & Get Shortened URL
                    </button>
                </form>
                {shortUrl && (
                    <div className="mt-6 p-4 bg-green-100 rounded">
                        <p className="text-green-800">
                            Your shortened URL:{" "}
                            <a
                                href={shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                {shortUrl}
                            </a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}