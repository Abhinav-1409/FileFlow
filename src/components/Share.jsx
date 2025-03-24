"use client";
import { useState } from "react";
import { upload } from "@/services/cloud";
import shortUrl from "@/services/shortUrl";
import { useSession } from "next-auth/react";
import saveFile from "@/utils/saveFile";

export default function Share() {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const { data: session } = useSession();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError("File exceeds maximum size of 10MB.");
                setFile(null);
                return;
            }
            setError("");
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please select a file to share.");
            return;
        }
        setError("");
        try {

            const response = await upload(file);
            if (response.error) {
                setError(response.error.message);
                return;
            }
            if (!response.url) {
                setError("Failed to retrieve file URL.");
                return;
            }
            const urlShorted = await shortUrl(response.url);
            if(session){
                console.log("session: ", session.user.id);
                saveFile(session.user.id, file.name, urlShorted);
            
                // await connectDB();
                // const userId = session.user.id;
                // await FileUrls.create({user: userId,title: file.name,url: urlShorted});
            }
            setUrl(urlShorted);
        } catch (err) {
            setError("An error occurred while uploading.");
            console.error(err);
        }
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
                            Allowed file size: max 10MB for raw files and 25MB for images/videos.
                        </span>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                    >
                        Share
                    </button>
                </form>
                {url && (
                    <div className="mt-6 p-4 bg-green-100 rounded">
                        <p className="text-green-800">
                            Your File URL:{" "}
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                {url}
                            </a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}