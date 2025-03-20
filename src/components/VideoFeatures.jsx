"use client";
import { useState, useEffect } from "react";

export default function VideoProcess() {
    const [selectedFeature, setSelectedFeature] = useState("resize");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(300);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(20);
    const [videoFormat, setVideoFormat] = useState("mp4");
    const [subtitleFile, setSubtitleFile] = useState(null);
    const [videoDuration, setVideoDuration] = useState(0);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 25 * 1024 * 1024) {
                alert("Video file size exceeds the maximum limit of 25MB.");
                return;
            }
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    const handleSubtitleChange = (e) => {
        const selectedSub = e.target.files[0];
        if (selectedSub) {
            setSubtitleFile(selectedSub);
        } else {
            setSubtitleFile(null);
        }
    };

    // Update preview, resolution, and trim limits based on video metadata
    useEffect(() => {
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
            const videoElement = document.createElement("video");
            videoElement.src = previewUrl;
            videoElement.onloadedmetadata = () => {
                setWidth(videoElement.videoWidth);
                setHeight(videoElement.videoHeight);
                const duration = videoElement.duration;
                setVideoDuration(duration);
                setStartTime(0);
                setEndTime(duration < 20 ? duration : 20);
            };
            // Cleanup the object URL when file changes or component unmounts
            return () => {
                URL.revokeObjectURL(previewUrl);
            };
        } else {
            setPreview(null);
            setWidth(500);
            setHeight(300);
            setVideoDuration(0);
            setStartTime(0);
            setEndTime(20);
        }
    }, [file]);

    // Reset states when changing feature
    useEffect(() => {
        setFile(null);
        setPreview(null);
        setWidth(500);
        setHeight(300);
        setStartTime(0);
        setEndTime(20);
        setVideoFormat("mp4");
        setSubtitleFile(null);
        setVideoDuration(0);
    }, [selectedFeature]);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Processing ${selectedFeature}...`);
    };

    return (
        <div className="p-6 bg-gray-100 flex flex-col items-center">
            <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Video Processing
                </h1>

                {/* Feature Selection */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <button
                        onClick={() => setSelectedFeature("resize")}
                        className={`px-6 py-3 rounded-lg border ${
                            selectedFeature === "resize" ? "bg-gray-300" : "bg-gray-100"
                        } hover:bg-gray-200 transition`}
                    >
                        Resize & Crop
                    </button>
                    <button
                        onClick={() => setSelectedFeature("trim")}
                        className={`px-6 py-3 rounded-lg border ${
                            selectedFeature === "trim" ? "bg-gray-300" : "bg-gray-100"
                        } hover:bg-gray-200 transition`}
                    >
                        Trim Video
                    </button>
                    <button
                        onClick={() => setSelectedFeature("convert")}
                        className={`px-6 py-3 rounded-lg border ${
                            selectedFeature === "convert" ? "bg-gray-300" : "bg-gray-100"
                        } hover:bg-gray-200 transition`}
                    >
                        Convert Format
                    </button>
                    <button
                        onClick={() => setSelectedFeature("subtitle")}
                        className={`px-6 py-3 rounded-lg border ${
                            selectedFeature === "subtitle" ? "bg-gray-300" : "bg-gray-100"
                        } hover:bg-gray-200 transition`}
                    >
                        Add Subtitles
                    </button>
                </div>

                {/* Forms */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side: Form Inputs */}
                    <div>
                        {selectedFeature === "resize" && (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Upload Video
                                    </label>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleFileChange}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                                    />
                                    <span className="text-sm text-gray-500">
                                        Allowed file size: max 25MB
                                    </span>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Width (e.g., {width})
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
                                            Height (e.g., {height})
                                        </label>
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {selectedFeature === "trim" && (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Upload Video
                                    </label>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleFileChange}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                                    />
                                    <span className="text-sm text-gray-500">
                                        Allowed file size: max 25MB
                                    </span>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Start Time (s)
                                        </label>
                                        <input
                                            type="number"
                                            value={startTime}
                                            min="0"
                                            max={Math.floor(videoDuration)}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            End Time (s)
                                        </label>
                                        <input
                                            type="number"
                                            value={endTime}
                                            min={startTime}
                                            max={Math.floor(videoDuration)}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                                        />
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">Video length: {Math.floor(videoDuration)} s</p>
                                <button
                                    type="submit"
                                    className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {selectedFeature === "convert" && (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Upload Video
                                    </label>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleFileChange}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                                    />
                                    <span className="text-sm text-gray-500">
                                        Allowed file size: max 25MB
                                    </span>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Convert To
                                    </label>
                                    <select
                                        value={videoFormat}
                                        onChange={(e) => setVideoFormat(e.target.value)}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                                    >
                                        <option value="mp4">MP4</option>
                                        <option value="webm">WebM</option>
                                        <option value="gif">GIF</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {selectedFeature === "subtitle" && (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Upload Video
                                    </label>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleFileChange}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                                    />
                                    <span className="text-sm text-gray-500">
                                        Allowed file size: max 25MB
                                    </span>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Upload Subtitles (.srt)
                                    </label>
                                    <input
                                        type="file"
                                        accept=".srt"
                                        onChange={handleSubtitleChange}
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500"
                                    />
                                    <span className="text-sm text-gray-500">
                                        Optional subtitle file
                                    </span>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition"
                                >
                                    Submit
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right Side: Video Preview */}
                    <div className="flex items-center justify-center">
                        {preview ? (
                            <video
                                src={preview}
                                controls
                                className="w-full max-w-md rounded-lg shadow-md border"
                            />
                        ) : (
                            <p className="text-gray-500">No video selected</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}