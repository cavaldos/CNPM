import React, { useState } from "react";
import {
    Button,
    TextField,
    Typography,
    Paper,
    Grid,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Box,
    Chip,
    Card
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { useNavigate } from "react-router-dom";
import InstructorService from "../../services/instructor.service";

const CreateCourse = () => {
    const navigate = useNavigate();
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseCategory, setCourseCategory] = useState("");
    const [courseLevel, setCourseLevel] = useState("");
    const [courseThumbnail, setCourseThumbnail] = useState(null);
    const [visibility, setVisibility] = useState(true); // Mặc định công khai
    const [isLoading, setIsLoading] = useState(false);

    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCourseThumbnail(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        // Xác thực dữ liệu đầu vào
        if (!courseTitle || !courseDescription || !courseCategory) {
            alert("Vui lòng điền đầy đủ thông tin cơ bản của khóa học!");
            return;
        }

        setIsLoading(true);
        try {
            // Gọi API tạo khóa học từ service
            const response = await InstructorService.createCourse(
                courseTitle,
                courseCategory,
                courseDescription,
                courseThumbnail || "",
                "instructor-id-placeholder" // Trong thực tế, lấy ID từ user đăng nhập
            );

            if (response && response.data) {
                alert("Khóa học đã được tạo thành công!");
                // Chuyển hướng đến trang thêm bài học với ID khóa học vừa tạo
                navigate(`/instructor/courses/${response.data.courseId}/lessons`);
            } else {
                throw new Error("Không nhận được phản hồi từ server");
            }
        } catch (error) {
            console.error("Lỗi khi tạo khóa học:", error);
            alert("Đã xảy ra lỗi khi tạo khóa học. Vui lòng thử lại sau!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                className="mb-6"
            >
                Quay lại
            </Button>

            <Typography variant="h4" component="h1" className="mb-8">
                Tạo khóa học mới
            </Typography>

            <Paper elevation={3} className="p-6 mb-6">
                <Box className="space-y-6">
                    <TextField
                        label="Tiêu đề khóa học"
                        variant="outlined"
                        fullWidth
                        required
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="Ví dụ: Nhập môn lập trình Python"
                    />

                    <TextField
                        label="Mô tả khóa học"
                        variant="outlined"
                        fullWidth
                        required
                        multiline
                        rows={4}
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        placeholder="Mô tả ngắn gọn về khóa học của bạn"
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel>Danh mục</InputLabel>
                                <Select
                                    value={courseCategory}
                                    onChange={(e) => setCourseCategory(e.target.value)}
                                    label="Danh mục"
                                >
                                    <MenuItem value="programming">Lập trình</MenuItem>
                                    <MenuItem value="data-science">Khoa học dữ liệu</MenuItem>
                                    <MenuItem value="web-development">Phát triển web</MenuItem>
                                    <MenuItem value="mobile-development">Phát triển ứng dụng di động</MenuItem>
                                    <MenuItem value="design">Thiết kế</MenuItem>
                                    <MenuItem value="business">Kinh doanh</MenuItem>
                                    <MenuItem value="language">Ngoại ngữ</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel>Trình độ</InputLabel>
                                <Select
                                    value={courseLevel}
                                    onChange={(e) => setCourseLevel(e.target.value)}
                                    label="Trình độ"
                                >
                                    <MenuItem value="beginner">Người mới bắt đầu</MenuItem>
                                    <MenuItem value="intermediate">Trung cấp</MenuItem>
                                    <MenuItem value="advanced">Nâng cao</MenuItem>
                                    <MenuItem value="all-levels">Tất cả các cấp độ</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <div>
                        <Typography variant="subtitle1" className="mb-2">Ảnh thumbnail khóa học</Typography>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            {courseThumbnail ? (
                                <div className="relative">
                                    <img
                                        src={courseThumbnail}
                                        alt="Course thumbnail"
                                        className="max-h-64 mx-auto"
                                    />
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        className="mt-2"
                                        onClick={() => setCourseThumbnail(null)}
                                    >
                                        Xóa ảnh
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <input
                                        accept="image/*"
                                        id="thumbnail-upload"
                                        type="file"
                                        hidden
                                        onChange={handleThumbnailChange}
                                    />
                                    <label htmlFor="thumbnail-upload">
                                        <Button
                                            variant="contained"
                                            component="span"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Tải ảnh lên
                                        </Button>
                                    </label>
                                    <Typography variant="body2" className="mt-2 text-gray-500">
                                        Khuyến nghị kích thước 1280x720 pixels (tỷ lệ 16:9)
                                    </Typography>
                                </>
                            )}
                        </div>
                    </div>

                    <div>
                        <Typography variant="subtitle1" className="mb-2">Chế độ hiển thị</Typography>
                        <div className="flex space-x-2">
                            <Chip
                                label="Công khai"
                                color={visibility ? "primary" : "default"}
                                onClick={() => setVisibility(true)}
                                clickable
                            />
                            <Chip
                                label="Ẩn"
                                color={!visibility ? "primary" : "default"}
                                onClick={() => setVisibility(false)}
                                clickable
                            />
                        </div>
                        <Typography variant="body2" className="mt-1 text-gray-500">
                            Chọn "Công khai" để khóa học hiển thị cho học viên ngay sau khi xuất bản. Chọn "Ẩn" nếu bạn muốn hoàn thiện thêm trước khi công khai.
                        </Typography>
                    </div>

                    <Card className="p-4 bg-blue-50 border border-blue-200">
                        <Typography variant="subtitle1" className="font-medium text-blue-800">
                            Lưu ý:
                        </Typography>
                        <Typography variant="body2" className="text-blue-700">
                            Sau khi tạo khóa học cơ bản, bạn sẽ được chuyển đến trang thêm bài học, nơi bạn có thể thêm các phần học và bài giảng cho khóa học của mình.
                        </Typography>
                    </Card>
                </Box>
            </Paper>

            <div className="flex justify-end">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "Đang xử lý..." : "Tạo khóa học và thêm bài học"}
                </Button>
            </div>
        </div>
    );
};

export default CreateCourse;