import React, { useState } from "react";
import axios from "axios";

const UploadVideo = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [videoURL, setVideoURL] = useState("");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const validVideoTypes = [
        "video/mp4", "video/webm", "video/ogg", "video/mov", "video/avi", "video/mkv",
        "video/flv"
    ];
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && validVideoTypes.includes(file.type)) {
            setError("");
            setVideoFile(file);
        } else {
            setError("Invalid file type. Please upload a video file.");
            setVideoFile(null);
        }
    };
    const uploadToCloudinary = async () => {
        if (!videoFile) {
            setError("Please select a video file first.");
            return;
        }
        setUploading(true);
        const formData = new FormData();
        formData.append("file", videoFile);
        formData.append("upload_preset", "ulvd134"); // Thay thế bằng upload preset của bạn

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dzy2olas8/video/upload", // Thay thế bằng Cloudinary cloud name của bạn
                formData
            );
            setVideoURL(response.data.secure_url);
        } catch (error) {
            console.error("Error uploading video:", error);
        } finally {
            setUploading(false);
        }
    };


    return (
        <div>
            <input className="cursor-pointer p-2 bg-neutral-200 rounded-lg text-black" onChange={handleFileChange} accept="video/*" type="file" />
            <button
                onClick={uploadToCloudinary}
                disabled={!videoFile || uploading}
                className="ml-3 bg-green-400 p-2 rounded-lg hover:bg-green-500 cursor-pointer" >{uploading ? "Uploading..." : "Upload Video"}</button>
            {uploading && <p className="text-yellow-500">Uploading...</p>}
            {videoURL && (
                <div>
                    <p className="text-blue-500 underline mt-2">
                        <a href={videoURL} target="_blank" rel="noopener noreferrer">
                            Video Link
                        </a>
                    </p>
                    <video controls width="100%" className="mt-2">
                        <source src={videoURL} type={videoFile?.type} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
};

export default UploadVideo;
