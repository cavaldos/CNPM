import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstructorService from "../../services/instructor.service";
import uploadService from "../../hooks/uploadImage";
import { useSelector } from "react-redux";
import { message } from "antd";

const CreateCourse = () => {
    const navigate = useNavigate();
    const [messageApi] = message.useMessage();
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseCategory, setCourseCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const user = useSelector((state) => state.auth);
    const [thumbnailType, setThumbnailType] = useState(0); // 0: URL, 1: Upload
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState("");

    const handleCategoryChange = (e) => setCourseCategory(e.target.value);

    const handleThumbnailTabChange = (newValue) => setThumbnailType(newValue);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setThumbnailFile(file);
            const objectUrl = URL.createObjectURL(file);
            setThumbnailPreview(objectUrl);

            try {
                setIsLoading(true);
                setUploadError("");
                const result = await uploadService.uploadImage(file);
                setThumbnailUrl(result.url);
                messageApi.success("Tải ảnh lên thành công!");
            } catch (err) {
                setUploadError("Tải ảnh lên thất bại: " + err.message);
                messageApi.error("Tải ảnh lên thất bại!");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSubmit = async () => {
        if (!courseTitle || !courseDescription || !courseCategory) {
            messageApi.error("Vui lòng điền đầy đủ thông tin cơ bản của khóa học!");
            return;
        }

        let finalThumbnail = "";
        if (thumbnailType === 0) {
            finalThumbnail = thumbnailUrl;
        } else {
            if (!thumbnailUrl) {
                messageApi.error("Vui lòng tải lên ảnh thumbnail cho khóa học!");
                return;
            }
            finalThumbnail = thumbnailUrl;
        }

        setIsLoading(true);
        try {
            const response = await InstructorService.createCourse(
                courseTitle,
                courseCategory,
                courseDescription,
                finalThumbnail,
                user.UserID
            );

            if (response.success) {
                messageApi.success("Khóa học đã được tạo thành công!");
                setTimeout(() => navigate("/my-courses"), 1000);
            } else {
                throw new Error(response.message || "Không nhận được phản hồi từ server");
            }
        } catch (error) {
            console.error("Lỗi khi tạo khóa học:", error);
            messageApi.error("Đã xảy ra lỗi khi tạo khóa học. Vui lòng thử lại sau!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 font-sans">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-6"
            >
                <span className="text-lg">←</span> Quay lại
            </button>

            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Tạo khóa học mới
            </h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tiêu đề khóa học *
                        </label>
                        <input
                            type="text"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            placeholder="Ví dụ: Nhập môn lập trình Python"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Mô tả khóa học *
                        </label>
                        <textarea
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)}
                            placeholder="Mô tả ngắn gọn về khóa học của bạn"
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Chủ đề *
                        </label>
                        <input
                            type="text"
                            value={courseCategory}
                            onChange={handleCategoryChange}
                            placeholder="Nhập chủ đề của khóa học"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                            Ảnh thumbnail khóa học
                        </h3>
                        <div className="flex gap-2 mb-4">
                            <button
                                onClick={() => handleThumbnailTabChange(0)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md ${thumbnailType === 0
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    } transition-colors`}
                            >
                                <span>🔗</span> Nhập URL
                            </button>
                            <button
                                onClick={() => handleThumbnailTabChange(1)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md ${thumbnailType === 1
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    } transition-colors`}
                            >
                                <span>☁️</span> Tải lên
                            </button>
                        </div>

                        {thumbnailType === 0 && (
                            <div>
                                <input
                                    type="text"
                                    value={thumbnailUrl}
                                    onChange={(e) => setThumbnailUrl(e.target.value)}
                                    placeholder="Nhập URL hình ảnh thumbnail cho khóa học"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Khuyến nghị: ảnh tỷ lệ 16:9, kích thước 1280x720 pixels
                                </p>
                                {thumbnailUrl && (
                                    <div className="mt-4 max-w-xs mx-auto">
                                        <p className="text-sm text-gray-600 mb-2">Xem trước:</p>
                                        <img
                                            src={thumbnailUrl}
                                            alt="Thumbnail preview"
                                            className="w-full rounded-md shadow-sm"
                                            onError={(e) =>
                                            (e.target.src =
                                                "https://via.placeholder.com/1280x720?text=Invalid+URL")
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {thumbnailType === 1 && (
                            <div className="text-center">
                                <label className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
                                    Chọn file ảnh
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-gray-500 mt-2">
                                    Khuyến nghị: ảnh tỷ lệ 16:9, kích thước 1280x720 pixels
                                </p>
                                {thumbnailPreview && (
                                    <div className="mt-4 max-w-xs mx-auto">
                                        <p className="text-sm text-gray-600 mb-2">Xem trước:</p>
                                        <img
                                            src={thumbnailPreview}
                                            alt="Thumbnail preview"
                                            className="w-full rounded-md shadow-sm"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                            {thumbnailFile?.name} (
                                            {Math.round(thumbnailFile?.size / 1024)} KB)
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                        <h4 className="text-sm font-semibold text-blue-800 mb-2">Lưu ý:</h4>
                        <p className="text-sm text-blue-700">
                            Sau khi tạo khóa học cơ bản, bạn sẽ được chuyển đến trang thêm bài
                            học, nơi bạn có thể thêm các phần học và bài giảng cho khóa học
                            của mình.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`px-6 py-3 rounded-md text-white font-semibold ${isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        } transition-colors`}
                >
                    {isLoading ? "Đang xử lý..." : "Tạo khóa học và thêm bài học"}
                </button>
            </div>
        </div>
    );
};

export default CreateCourse;