import { useState } from "react";
import axios from "axios";


const useUpLoadVideo = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [videoURL, setVideoURL] = useState("");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const cloud_token = import.meta.env.VITE_CLOUDINARY_CLOUD_TOKEN;
    const cloudinaryUrl =`https://api.cloudinary.com/v1_1/${cloud_token}/video/upload`
    const uploadPreset =  import.meta.env.VITE_CLOUDINARY_PRESET;

    const validVideoTypes = [
        "video/mp4",
        "video/webm",
        "video/ogg",
        "video/mov",
        "video/avi",
        "video/mkv",
        "video/flv",
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
        formData.append("upload_preset", uploadPreset); // Thay bằng upload preset của bạn

        try {
            const response = await axios.post(cloudinaryUrl, formData);
            setVideoURL(response.data.secure_url);
        } catch (error) {
            console.error("Error uploading video:", error);
            setError("Failed to upload video. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return {
        videoFile,
        videoURL, // Link video đã upload
        uploading, // Trạng thái đang upload
        error, // Thông báo lỗi
        handleFileChange, // Hàm xử lý khi chọn file
        uploadToCloudinary, // Hàm upload video
    };
};

export default useUpLoadVideo;
