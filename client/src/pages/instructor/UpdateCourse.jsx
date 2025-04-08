import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import InstructorService from "../../services/instructor.service";

import uploadService from "../../hooks/uploadImage";
import { useSelector } from "react-redux";
import { message } from "antd";
const UpdateCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageInputType, setImageInputType] = useState("file");
  const user = useSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await InstructorService.getCourseByID(courseId);
        console.log("Course data:", response.data);
        if (response.data) {
          const courseData = response.data[0];
          setFormData({
            title: courseData.Title || "",
            topic: courseData.Topic || "",
            description: courseData.Description || "",
            image: courseData.Image || "",
          });

          if (courseData.Image) {
            setImagePreview(
              courseData.Image.startsWith("http")
                ? courseData.Image
                : `/images/courses/${courseData.Image}`
            );
            setImageInputType(courseData.Image.startsWith("http") ? "url" : "file");
          }
          setError(null);
        } else {
          setError("Không tìm thấy thông tin khóa học.");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Không thể tải thông tin khóa học. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "image" && imageInputType === "url" && value) {
      setImagePreview(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageInputTypeChange = (type) => {
    setImageInputType(type);
    if (type === "url") {
      setImageFile(null);
    } else {
      if (!imageFile) {
        setFormData({ ...formData, image: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      let imageUrl = formData.image;
      if (imageInputType === "file" && imageFile) {
        try {
          const result = await uploadService.uploadImage(imageFile);
          imageUrl = result.url;
        } catch (err) {
          messageApi.error('Tải ảnh lên thất bại: ' + err.message);
          return;
        }
      }

      const instructorID = user.UserID
      const response = await InstructorService.updateCourse(
        courseId,
        formData.title,
        formData.topic,
        formData.description,
        imageUrl,
        instructorID
      );
      if (response.success || response.data) {
        setSuccess(true);
        messageApi.success("Cập nhật khóa học thành công!");
      }
    } catch (err) {
      console.error("Error updating course:", err);
      setError("Không thể cập nhật khóa học. Vui lòng thử lại sau.");
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => navigate("/my-courses");
  const handleAddLessons = () => navigate(`/courses/${courseId}/add-lessons`);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {contextHolder}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Chỉnh sửa khóa học</h1>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            onClick={handleBack}
          >
            <ArrowLeft size={20} /> Quay lại
          </button>
          <button
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={handleAddLessons}
          >
            Quản lý bài học
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 size={40} className="animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề khóa học *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chủ đề *
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full p-3 border rounded focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-4 border rounded">
                <h3 className="text-lg font-medium mb-4">Hình ảnh khóa học</h3>
                <div className="mb-4">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Course Preview"
                      className="w-full h-48 object-cover rounded border"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded border">
                      <span className="text-gray-500">Chưa có hình ảnh</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => handleImageInputTypeChange("file")}
                    className={`px-3 py-1 rounded text-sm ${imageInputType === "file"
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : "bg-gray-100 text-gray-700 border border-gray-300"
                      }`}
                  >
                    Tải ảnh lên
                  </button>
                  <button
                    type="button"
                    onClick={() => handleImageInputTypeChange("url")}
                    className={`px-3 py-1 rounded text-sm ${imageInputType === "url"
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : "bg-gray-100 text-gray-700 border border-gray-300"
                      }`}
                  >
                    Dùng URL
                  </button>
                </div>

                {imageInputType === "file" ? (
                  <label className="block w-full">
                    <span className="sr-only">Chọn hình ảnh</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </label>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL hình ảnh
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Khuyến nghị: Tỷ lệ 16:9, tối thiểu 1280x720px
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Đang lưu...
                </>
              ) : (
                <>
                  <Save
                    size={20} /> Lưu thay đổi
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateCourse;