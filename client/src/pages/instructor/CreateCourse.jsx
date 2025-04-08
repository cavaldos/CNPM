import React, { useState } from "react";
import {
    TextField,
    Typography,
    Paper,
    Box,
    Card,
    Tabs,
    Tab,
    Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LinkIcon from "@mui/icons-material/Link";
import { useNavigate } from "react-router-dom";
import InstructorService from "../../services/instructor.service";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { message } from 'antd';

// Styled component cho input file
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const CreateCourse = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseCategory, setCourseCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.auth);
    // Thumbnail states
    const [thumbnailType, setThumbnailType] = useState(0); // 0: URL, 1: Upload
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState("");

    const handleCategoryChange = (e) => {
        setCourseCategory(e.target.value);
    };

    const handleThumbnailTabChange = (event, newValue) => {
        setThumbnailType(newValue);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setThumbnailFile(file);
            // Tạo URL tạm thời để hiển thị preview
            const objectUrl = URL.createObjectURL(file);
            setThumbnailPreview(objectUrl);

            // Ở đây trong một ứng dụng thực, bạn có thể tải file lên server và nhận về URL
            // Trong bản demo này chúng ta chỉ hiển thị preview
        }
    };

    const handleSubmit = async () => {
        // Xác thực dữ liệu đầu vào
        if (!courseTitle || !courseDescription || !courseCategory) {
            messageApi.error('Vui lòng điền đầy đủ thông tin cơ bản của khóa học!');
            return;
        }

        // Xác định thumbnail được sử dụng
        let finalThumbnail = "";
        if (thumbnailType === 0) { // URL
            finalThumbnail = thumbnailUrl;
        } else { // Upload
            finalThumbnail = thumbnailPreview;
        }

        setIsLoading(true);
        try {
            // Gọi API tạo khóa học từ service
            const response = await InstructorService.createCourse(
                courseTitle,
                courseCategory,
                courseDescription,
                finalThumbnail || "",
                user.UserID
            );

            if (response.success) {
                messageApi.success('Khóa học đã được tạo thành công!');

                // Đợi 1 giây sau mới navigate
                setTimeout(() => {
                    navigate('/my-courses');
                }, 1000);
            } else {
                throw new Error(response.message || "Không nhận được phản hồi từ server");
            }
        } catch (error) {
            console.error("Lỗi khi tạo khóa học:", error);
            messageApi.error('Đã xảy ra lỗi khi tạo khóa học. Vui lòng thử lại sau!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {contextHolder}
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

                    <TextField
                        label="Chủ đề"
                        variant="outlined"
                        fullWidth
                        required
                        value={courseCategory}
                        onChange={handleCategoryChange}
                        placeholder="Nhập chủ đề của khóa học"
                    />

                    {/* Thumbnail section with tabs */}
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Ảnh thumbnail khóa học
                        </Typography>
                        <Tabs value={thumbnailType} onChange={handleThumbnailTabChange}>
                            <Tab icon={<LinkIcon />} label="Nhập URL" />
                            <Tab icon={<CloudUploadIcon />} label="Tải lên" />
                        </Tabs>

                        {/* URL Input */}
                        {thumbnailType === 0 && (
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    label="Link ảnh thumbnail"
                                    variant="outlined"
                                    fullWidth
                                    value={thumbnailUrl}
                                    onChange={(e) => setThumbnailUrl(e.target.value)}
                                    placeholder="Nhập URL hình ảnh thumbnail cho khóa học"
                                    helperText="Khuyến nghị sử dụng ảnh với tỷ lệ 16:9, kích thước đề xuất 1280x720 pixels"
                                />
                                {thumbnailUrl && (
                                    <Box sx={{ mt: 2, maxWidth: '300px', mx: 'auto' }}>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            Xem trước:
                                        </Typography>
                                        <img
                                            src={thumbnailUrl}
                                            alt="Thumbnail preview"
                                            style={{ width: '100%', borderRadius: '8px' }}
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/1280x720?text=Invalid+URL'; }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        )}

                        {/* File Upload */}
                        {thumbnailType === 1 && (
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Chọn file ảnh
                                    <VisuallyHiddenInput
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </Button>
                                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                    Khuyến nghị sử dụng ảnh với tỷ lệ 16:9, kích thước đề xuất 1280x720 pixels
                                </Typography>

                                {thumbnailPreview && (
                                    <Box sx={{ mt: 2, maxWidth: '300px', mx: 'auto' }}>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            Xem trước:
                                        </Typography>
                                        <img
                                            src={thumbnailPreview}
                                            alt="Thumbnail preview"
                                            style={{ width: '100%', borderRadius: '8px' }}
                                        />
                                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                            {thumbnailFile?.name} ({Math.round(thumbnailFile?.size / 1024)} KB)
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>

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