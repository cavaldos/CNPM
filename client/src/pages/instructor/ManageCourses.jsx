import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Typography,
    Card,
    Grid,
    Box,
    Tabs,
    Tab,
    TextField,
    InputAdornment,
    Menu,
    MenuItem,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    LinearProgress,
    Switch,
    FormControlLabel
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PublicIcon from "@mui/icons-material/Public";
import ForumIcon from "@mui/icons-material/Forum";

const ManageCourses = () => {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [sortBy, setSortBy] = useState("newest");

    // Mock data cho các khóa học - Đã bỏ thông tin revenue
    const mockCourses = [
        {
            id: 1,
            title: "Nhập môn lập trình Python",
            status: "published", // public
            thumbnail: "https://img-c.udemycdn.com/course/480x270/394676_ce3d_5.jpg",
            students: 1245,
            rating: 4.7,
            lastUpdated: "2023-10-15",
            completionRate: 85,
            visibility: true
        },
        {
            id: 2,
            title: "JavaScript nâng cao cho front-end developer",
            status: "published", // public
            thumbnail: "https://img-c.udemycdn.com/course/480x270/851712_fc61_6.jpg",
            students: 832,
            rating: 4.5,
            lastUpdated: "2023-09-20",
            completionRate: 75,
            visibility: true
        },
        {
            id: 3,
            title: "Machine Learning với TensorFlow",
            status: "draft", // ẩn
            thumbnail: "https://img-c.udemycdn.com/course/480x270/2070485_6e5a.jpg",
            students: 0,
            rating: 0,
            lastUpdated: "2023-11-01",
            completionRate: 0,
            visibility: false
        },
        {
            id: 4,
            title: "Thiết kế UI/UX hiệu quả",
            status: "published", // public
            thumbnail: "https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg",
            students: 567,
            rating: 4.8,
            lastUpdated: "2023-08-10",
            completionRate: 92,
            visibility: true
        },
        {
            id: 5,
            title: "AWS Cloud Practitioner - Chuẩn bị cho chứng chỉ",
            status: "draft", // ẩn
            thumbnail: "https://img-c.udemycdn.com/course/480x270/2196488_8fc7_7.jpg",
            students: 0,
            rating: 0,
            lastUpdated: "2023-11-05",
            completionRate: 0,
            visibility: false
        }
    ];

    // Lọc khóa học dựa trên tab hiện tại và tìm kiếm
    const getFilteredCourses = () => {
        let filtered = [...mockCourses];

        // Lọc theo tab
        if (tabValue === 1) { // Published (public)
            filtered = filtered.filter(course => course.visibility === true);
        } else if (tabValue === 2) { // Draft (ẩn)
            filtered = filtered.filter(course => course.visibility === false);
        }

        // Lọc theo tìm kiếm
        if (searchQuery) {
            filtered = filtered.filter(course =>
                course.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sắp xếp
        if (sortBy === "newest") {
            filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        } else if (sortBy === "oldest") {
            filtered.sort((a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated));
        } else if (sortBy === "students") {
            filtered.sort((a, b) => b.students - a.students);
        } else if (sortBy === "rating") {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        return filtered;
    };

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleMenuOpen = (event, course) => {
        setAnchorEl(event.currentTarget);
        setSelectedCourse(course);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditCourse = () => {
        handleMenuClose();
        // Điều hướng đến trang chỉnh sửa khóa học
        navigate(`/edit-course/${selectedCourse.id}`);
    };

    const handleDeleteClick = () => {
        handleMenuClose();
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        console.log(`Deleting course with ID: ${selectedCourse.id}`);
        setDeleteDialogOpen(false);
        // Thực hiện xóa khóa học trên API
        // ...
    };

    const handleToggleVisibility = (courseId) => {
        // Giả lập việc cập nhật trạng thái hiển thị của khóa học
        console.log(`Toggling visibility for course ID: ${courseId}`);
        // Thông thường sẽ gọi API ở đây
    };

    const handleSortChange = (sortOption) => {
        setSortBy(sortOption);
    };

    const handleGoToDiscussion = (courseId) => {
        navigate(`/discussion-forum/${courseId}`);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4" component="h1">
                    Quản lý khóa học
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/create-course")}
                >
                    Tạo khóa học mới
                </Button>
            </div>

            <Card className="mb-6">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        aria-label="course management tabs"
                    >
                        <Tab label="Tất cả" />
                        <Tab label="Đã công khai" />
                        <Tab label="Đang ẩn" />
                    </Tabs>
                </Box>

                <Box className="p-4">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <TextField
                            placeholder="Tìm kiếm khóa học..."
                            variant="outlined"
                            size="small"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="min-w-[300px]"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <div className="flex items-center space-x-2">
                            <Typography variant="body2" className="text-gray-600">
                                Sắp xếp theo:
                            </Typography>
                            <div className="flex gap-2">
                                <Chip
                                    label="Mới nhất"
                                    clickable
                                    color={sortBy === "newest" ? "primary" : "default"}
                                    onClick={() => handleSortChange("newest")}
                                />
                                <Chip
                                    label="Cũ nhất"
                                    clickable
                                    color={sortBy === "oldest" ? "primary" : "default"}
                                    onClick={() => handleSortChange("oldest")}
                                />
                                <Chip
                                    label="Học viên"
                                    clickable
                                    color={sortBy === "students" ? "primary" : "default"}
                                    onClick={() => handleSortChange("students")}
                                />
                                <Chip
                                    label="Đánh giá"
                                    clickable
                                    color={sortBy === "rating" ? "primary" : "default"}
                                    onClick={() => handleSortChange("rating")}
                                />
                            </div>
                        </div>
                    </div>

                    <Grid container spacing={4}>
                        {getFilteredCourses().map((course) => (
                            <Grid item xs={12} md={6} lg={4} key={course.id}>
                                <Card className="h-full flex flex-col">
                                    <div className="relative">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-2 left-2">
                                            {course.visibility ? (
                                                <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                                                    <PublicIcon fontSize="small" className="mr-1" /> Công khai
                                                </div>
                                            ) : (
                                                <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                                                    <VisibilityOffIcon fontSize="small" className="mr-1" /> Đang ẩn
                                                </div>
                                            )}
                                        </div>
                                        <IconButton
                                            className="absolute top-2 right-2 bg-white"
                                            size="small"
                                            onClick={(e) => handleMenuOpen(e, course)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </div>

                                    <div className="p-4 flex-grow">
                                        <Typography variant="h6" className="font-semibold mb-2 line-clamp-2">
                                            {course.title}
                                        </Typography>

                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-1">
                                                <Typography variant="body2" className="text-gray-600">
                                                    Cập nhật:
                                                </Typography>
                                                <Typography variant="body2" className="text-gray-800">
                                                    {new Date(course.lastUpdated).toLocaleDateString('vi-VN')}
                                                </Typography>
                                            </div>

                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        size="small"
                                                        checked={course.visibility}
                                                        onChange={() => handleToggleVisibility(course.id)}
                                                        color="primary"
                                                    />
                                                }
                                                label={
                                                    <Typography variant="body2">
                                                        {course.visibility ? "Công khai" : "Ẩn"}
                                                    </Typography>
                                                }
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            <div>
                                                <Typography variant="body2" className="text-gray-600">
                                                    Học viên
                                                </Typography>
                                                <Typography variant="h6" className="font-semibold">
                                                    {course.students.toLocaleString()}
                                                </Typography>
                                            </div>
                                            {course.visibility && course.rating > 0 && (
                                                <div>
                                                    <Typography variant="body2" className="text-gray-600">
                                                        Đánh giá
                                                    </Typography>
                                                    <Typography variant="h6" className="font-semibold">
                                                        {course.rating} ★
                                                    </Typography>
                                                </div>
                                            )}
                                        </div>

                                        {course.visibility && course.completionRate > 0 && (
                                            <>
                                                <Typography variant="body2" className="text-gray-600 mb-1">
                                                    Tỉ lệ hoàn thành
                                                </Typography>
                                                <Box className="w-full mb-2">
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={course.completionRate}
                                                        className="h-2 rounded-full"
                                                        color={course.completionRate > 80 ? "success" : "primary"}
                                                    />
                                                    <Typography variant="body2" className="text-right mt-1">
                                                        {course.completionRate}%
                                                    </Typography>
                                                </Box>
                                            </>
                                        )}

                                        {/* Add Discussion Button */}
                                        <Button
                                            variant="outlined"
                                            startIcon={<ForumIcon />}
                                            size="small"
                                            fullWidth
                                            className="mt-3"
                                            onClick={() => handleGoToDiscussion(course.id)}
                                        >
                                            Diễn đàn thảo luận
                                        </Button>
                                    </div>

                                    {course.visibility && (
                                        <div className="bg-gray-50 p-4 border-t">
                                            <Typography variant="body2" className="text-gray-600 font-semibold">
                                                Trạng thái: Miễn phí
                                            </Typography>
                                            <Typography variant="caption" className="text-green-700">
                                                Khóa học này hoàn toàn miễn phí cho tất cả học viên
                                            </Typography>
                                        </div>
                                    )}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {getFilteredCourses().length === 0 && (
                        <Box className="text-center py-10">
                            <Typography variant="h6" className="text-gray-500 mb-2">
                                Không tìm thấy khóa học
                            </Typography>
                            <Typography variant="body1" className="text-gray-400">
                                Thử tìm kiếm với từ khóa khác hoặc tạo khóa học mới
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                className="mt-4"
                                onClick={() => navigate("/create-course")}
                            >
                                Tạo khóa học mới
                            </Button>
                        </Box>
                    )}
                </Box>
            </Card>

            {/* Menu tùy chọn cho khóa học */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditCourse}>
                    <EditIcon fontSize="small" className="mr-2" /> Chỉnh sửa
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <VisibilityIcon fontSize="small" className="mr-2" /> Xem trước
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ContentCopyIcon fontSize="small" className="mr-2" /> Sao chép
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} className="text-red-600">
                    <DeleteIcon fontSize="small" className="mr-2" /> Xóa
                </MenuItem>
            </Menu>

            {/* Dialog xác nhận xóa khóa học */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Xác nhận xóa khóa học</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa khóa học "{selectedCourse?.title}"? Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageCourses;