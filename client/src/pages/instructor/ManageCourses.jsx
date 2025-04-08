import React, { useState, useEffect } from "react";
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import { message } from "antd";
import InstructorService from "../../services/instructor.service";
import CourseInstructorView from "../../components/ui/course/CourseInsView";

import { useSelector } from "react-redux";
const ManageCourses = () => {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [sortBy, setSortBy] = useState("newest");
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.auth);
    const [messageApi, contextHolder] = message.useMessage();

    // Fetch courses from API
    useEffect(() => {
        fetchCourses();
    }, []);

    // Function to handle visibility toggle of a course
    const handleToggleVisibility = async (courseId, currentlyHidden) => {
        try {
            await InstructorService.setHiddenCourse(courseId, !currentlyHidden);
            // Update the local state to reflect the change
            setCourses(
                courses.map((course) =>
                    course.CourseID === courseId
                        ? { ...course, IsHidden: !currentlyHidden }
                        : course,
                ),
            );
        } catch (err) {
            console.error("Error toggling course visibility:", err);
            // Possibly show an error message to the user
        }
    };

    // Lọc khóa học dựa trên tab hiện tại và tìm kiếm
    const getFilteredCourses = () => {
        let filtered = [...courses];

        // Lọc theo tab
        if (tabValue === 1) {
            // Published (public)
            filtered = filtered.filter((course) => !course.IsHidden);
        } else if (tabValue === 2) {
            // Draft (hidden)
            filtered = filtered.filter((course) => course.IsHidden);
        }

        // Lọc theo tìm kiếm
        if (searchQuery) {
            filtered = filtered.filter(
                (course) =>
                    course.Title.toLowerCase().includes(
                        searchQuery.toLowerCase(),
                    ) ||
                    course.Topic.toLowerCase().includes(
                        searchQuery.toLowerCase(),
                    ) ||
                    course.Description.toLowerCase().includes(
                        searchQuery.toLowerCase(),
                    ),
            );
        }

        // Sắp xếp
        if (sortBy === "newest") {
            filtered.sort(
                (a, b) => new Date(b.CreateTime) - new Date(a.CreateTime),
            );
        } else if (sortBy === "oldest") {
            filtered.sort(
                (a, b) => new Date(a.CreateTime) - new Date(b.CreateTime),
            );
        } else if (sortBy === "rating") {
            filtered.sort((a, b) => (b.AvgRating || 0) - (a.AvgRating || 0));
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
        navigate(`/courses/${selectedCourse.CourseID}/update`);
    };

    const handleDeleteClick = () => {
        handleMenuClose();
        setDeleteDialogOpen(true);
    };

    // Function to fetch courses from API
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const instructorID = user.UserID;
            const response = await InstructorService.getAllCoursesByInstructorID(instructorID);
            setCourses(response.data || []);
            setError(null);
        } catch (err) {
            console.error("Error fetching courses:", err);
            setError("Failed to load courses. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            console.log(`Deleting course with ID: ${selectedCourse.CourseID}`);
            setDeleteDialogOpen(false);

            // Call API to delete the course
            const response = await InstructorService.deleteCourse(selectedCourse.CourseID);

            if (response.success || response.data.success) {
                // Show success notification using messageApi instead of notification
                messageApi.success('Khóa học đã được xóa thành công');

                await fetchCourses();
            } else {
                console.error("Failed to delete course:", response.data?.message || "Unknown error");
                messageApi.error(response.data?.message || "Không thể xóa khóa học. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            messageApi.error("Đã xảy ra lỗi khi xóa khóa học. Vui lòng thử lại sau.");
        }
    };

    const handleSortChange = (sortOption) => {
        setSortBy(sortOption);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {contextHolder}
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
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
                            <Typography
                                variant="body2"
                                className="text-gray-600"
                            >
                                Sắp xếp theo:
                            </Typography>
                            <div className="flex gap-2">
                                <Chip
                                    label="Mới nhất"
                                    clickable
                                    color={
                                        sortBy === "newest"
                                            ? "primary"
                                            : "default"
                                    }
                                    onClick={() => handleSortChange("newest")}
                                />
                                <Chip
                                    label="Cũ nhất"
                                    clickable
                                    color={
                                        sortBy === "oldest"
                                            ? "primary"
                                            : "default"
                                    }
                                    onClick={() => handleSortChange("oldest")}
                                />
                                <Chip
                                    label="Đánh giá"
                                    clickable
                                    color={
                                        sortBy === "rating"
                                            ? "primary"
                                            : "default"
                                    }
                                    onClick={() => handleSortChange("rating")}
                                />
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <Box className="flex justify-center items-center py-20">
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Box className="text-center py-10">
                            <Typography
                                variant="h6"
                                className="text-red-500 mb-2"
                            >
                                {error}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => window.location.reload()}
                                className="mt-4"
                            >
                                Thử lại
                            </Button>
                        </Box>
                    ) : (
                        <Grid container spacing={4}>
                            {getFilteredCourses().map((course) => (
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    lg={4}
                                    key={course.CourseID}
                                >
                                    <CourseInstructorView
                                        course={course}
                                        onMenuOpen={handleMenuOpen}
                                        onToggleVisibility={
                                            handleToggleVisibility
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {!loading &&
                        !error &&
                        getFilteredCourses().length === 0 && (
                            <Box className="text-center py-10">
                                <Typography
                                    variant="h6"
                                    className="text-gray-500 mb-2"
                                >
                                    Không tìm thấy khóa học
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className="text-gray-400"
                                >
                                    Thử tìm kiếm với từ khóa khác hoặc tạo khóa
                                    học mới
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
                    <VisibilityIcon fontSize="small" className="mr-2" /> Xem
                    trước
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <ContentCopyIcon fontSize="small" className="mr-2" /> Sao
                    chép
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
                        Bạn có chắc chắn muốn xóa khóa học "
                        {selectedCourse?.Title}"? Hành động này không thể hoàn
                        tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                    >
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ManageCourses;
