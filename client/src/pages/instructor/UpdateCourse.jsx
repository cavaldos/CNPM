import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Typography,
  Card,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  CircularProgress,
  Alert,
  Grid,
  Paper,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add"; // Import the Add icon
import InstructorService from "../../services/instructor.service";
import { uploadImage } from "../../hooks/uploadImage";

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

  // Các chủ đề có sẵn cho khóa học
  const topics = [
    "Programming",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "DevOps",
    "Software Engineering",
    "Databases",
    "Cloud Computing",
    "Cybersecurity",
    "Game Development",
    "Networking",
    "Blockchain",
    "Other",
  ];

  // Load thông tin khóa học hiện tại
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await InstructorService.getCourseByID(courseId);

        if (response.data) {
          const courseData = response.data;
          setFormData({
            title: courseData.Title || "",
            topic: courseData.Topic || "",
            description: courseData.Description || "",
            image: courseData.Image || "",
          });

          // Hiển thị preview của ảnh hiện tại
          if (courseData.Image) {
            setImagePreview(
              courseData.Image.startsWith("http")
                ? courseData.Image
                : `/images/courses/${courseData.Image}`
            );
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

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lý thay đổi file ảnh
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

  // Xử lý lưu thay đổi
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      // Upload ảnh mới nếu có
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Lấy ID của giảng viên (trong ứng dụng thực tế, nên lấy từ context hoặc local storage)
      const instructorID = 3; // Giá trị này nên được thay thế bằng ID thực tế của người dùng

      // Cập nhật thông tin khóa học
      const response = await InstructorService.updateCourse(
        courseId,
        formData.title,
        formData.topic,
        formData.description,
        imageUrl,
        instructorID
      );

      if (response && response.data) {
        setSuccess(true);
        // Có thể chuyển hướng người dùng sau khi cập nhật thành công
        setTimeout(() => {
          navigate("/my-courses");
        }, 2000);
      }
    } catch (err) {
      console.error("Error updating course:", err);
      setError("Không thể cập nhật khóa học. Vui lòng thử lại sau.");
    } finally {
      setSaving(false);
    }
  };

  // Quay lại trang quản lý khóa học
  const handleBack = () => {
    navigate("/my-courses");
  };

  // Chuyển đến trang thêm bài học
  const handleAddLessons = () => {
    navigate(`/courses/${courseId}/add-lessons`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1">
          Chỉnh sửa khóa học
        </Typography>
        <div>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={handleAddLessons}
            className="mr-4"
          >
            Thêm bài học
          </Button>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Quay lại
          </Button>
        </div>
      </Box>

      {loading ? (
        <Box className="flex justify-center items-center py-20">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card className="mb-6 p-6">
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Tiêu đề khóa học"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                  variant="outlined"
                />

                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Chủ đề</InputLabel>
                  <Select
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    label="Chủ đề"
                  >
                    {topics.map((topic) => (
                      <MenuItem key={topic} value={topic}>
                        {topic}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Mô tả"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={5}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper className="p-4 mb-4">
                  <Typography variant="subtitle1" gutterBottom>
                    Hình ảnh khóa học
                  </Typography>

                  <div className="mb-4">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Course Preview"
                        className="w-full h-48 object-cover rounded border border-gray-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded border border-gray-300">
                        <Typography variant="body2" color="textSecondary">
                          Chưa có hình ảnh
                        </Typography>
                      </div>
                    )}
                  </div>

                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    className="mb-2"
                  >
                    Chọn hình ảnh
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>

                  <Typography variant="caption" color="textSecondary">
                    Khuyến nghị: Hình ảnh có tỷ lệ 16:9, kích thước tối thiểu 1280x720px
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Card>

          {success && (
            <Alert severity="success" className="mb-4">
              Cập nhật khóa học thành công!
            </Alert>
          )}

          <Box className="flex justify-end">
            <Button
              type="button"
              variant="outlined"
              onClick={handleBack}
              className="mr-4"
              disabled={saving}
            >
              Hủy
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              disabled={saving}
            >
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default UpdateCourse;