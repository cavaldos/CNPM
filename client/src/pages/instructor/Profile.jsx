import React, { useState } from "react";
import {
    Typography,
    Box,
    Card,
    Grid,
    Avatar,
    TextField,
    Button,
    Divider,
    Tabs,
    Tab,
    Chip,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";

const InstructorProfile = () => {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    // Mock user data - this would be fetched from API in a real application
    const [profileData, setProfileData] = useState({
        fullName: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        role: "Instructor",
        bio: "Giáo viên với hơn 10 năm kinh nghiệm trong lĩnh vực công nghệ thông tin, chuyên về phát triển web và học máy. Đam mê chia sẻ kiến thức và giúp đỡ học viên phát triển kỹ năng công nghệ.",
        institution: "Đại học Bách Khoa Hà Nội",
        title: "Giảng viên công nghệ thông tin",
        languages: ["Tiếng Việt", "Tiếng Anh"],
        location: "Hà Nội, Việt Nam",
        website: "https://example.com",
        linkedin: "https://linkedin.com/in/example",
        facebook: "https://facebook.com/example",
        twitter: "https://twitter.com/example",
        github: "https://github.com/example",
        avatarUrl: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        totalStudents: 2547,
        totalCourses: 5,
        averageRating: 4.8,
        joinDate: "15/03/2022"
    });

    // Stats for instructor
    const stats = [
        { label: "Học viên", value: profileData.totalStudents.toLocaleString() },
        { label: "Khóa học", value: profileData.totalCourses },
        { label: "Đánh giá", value: `${profileData.averageRating}/5` }
    ];

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleProfileChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveProfile = () => {
        setLoading(true);

        // Simulate API call to update profile
        setTimeout(() => {
            setLoading(false);
            setEditMode(false);
            // Here you would typically make an API call to save the profile data
            // Example: await instructorService.updateProfile(profileData);
            console.log("Profile saved:", profileData);
        }, 1000);
    };

    const renderPersonalInfoTab = () => {
        if (editMode) {
            return (
                <Box component="form" className="space-y-6">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Họ và tên"
                                variant="outlined"
                                fullWidth
                                value={profileData.fullName}
                                onChange={(e) => handleProfileChange("fullName", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={profileData.email}
                                onChange={(e) => handleProfileChange("email", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Cơ quan/Tổ chức"
                                variant="outlined"
                                fullWidth
                                value={profileData.institution}
                                onChange={(e) => handleProfileChange("institution", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Chức danh"
                                variant="outlined"
                                fullWidth
                                value={profileData.title}
                                onChange={(e) => handleProfileChange("title", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Giới thiệu"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={profileData.bio}
                                onChange={(e) => handleProfileChange("bio", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Vị trí"
                                variant="outlined"
                                fullWidth
                                value={profileData.location}
                                onChange={(e) => handleProfileChange("location", e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Website"
                                variant="outlined"
                                fullWidth
                                value={profileData.website}
                                onChange={(e) => handleProfileChange("website", e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="h6" className="mb-2 mt-4">
                        Mạng xã hội
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="LinkedIn"
                                variant="outlined"
                                fullWidth
                                value={profileData.linkedin}
                                onChange={(e) => handleProfileChange("linkedin", e.target.value)}
                                InputProps={{
                                    startAdornment: <LinkedInIcon fontSize="small" className="mr-2 text-gray-400" />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Facebook"
                                variant="outlined"
                                fullWidth
                                value={profileData.facebook}
                                onChange={(e) => handleProfileChange("facebook", e.target.value)}
                                InputProps={{
                                    startAdornment: <FacebookIcon fontSize="small" className="mr-2 text-gray-400" />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Twitter"
                                variant="outlined"
                                fullWidth
                                value={profileData.twitter}
                                onChange={(e) => handleProfileChange("twitter", e.target.value)}
                                InputProps={{
                                    startAdornment: <TwitterIcon fontSize="small" className="mr-2 text-gray-400" />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="GitHub"
                                variant="outlined"
                                fullWidth
                                value={profileData.github}
                                onChange={(e) => handleProfileChange("github", e.target.value)}
                                InputProps={{
                                    startAdornment: <GitHubIcon fontSize="small" className="mr-2 text-gray-400" />,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <div className="flex justify-end space-x-3 mt-6">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setEditMode(false)}
                        >
                            Hủy
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveProfile}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Lưu thông tin"}
                        </Button>
                    </div>
                </Box>
            );
        } else {
            return (
                <div className="space-y-6">
                    <div className="flex justify-end">
                        <Button
                            startIcon={<EditIcon />}
                            variant="outlined"
                            color="primary"
                            onClick={handleEditToggle}
                        >
                            Chỉnh sửa
                        </Button>
                    </div>

                    <Typography variant="body1" className="text-gray-700">
                        {profileData.bio}
                    </Typography>

                    <Divider className="my-4" />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <List className="p-0">
                                <ListItem className="px-0">
                                    <ListItemIcon className="min-w-[40px]">
                                        <AccountCircleIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Họ và tên"
                                        secondary={profileData.fullName}
                                    />
                                </ListItem>

                                <ListItem className="px-0">
                                    <ListItemIcon className="min-w-[40px]">
                                        <EmailIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Email"
                                        secondary={profileData.email}
                                    />
                                </ListItem>

                                <ListItem className="px-0">
                                    <ListItemIcon className="min-w-[40px]">
                                        <SchoolIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Cơ quan/Tổ chức"
                                        secondary={profileData.institution}
                                    />
                                </ListItem>

                                <ListItem className="px-0">
                                    <ListItemIcon className="min-w-[40px]">
                                        <LanguageIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Vị trí"
                                        secondary={profileData.location}
                                    />
                                </ListItem>
                            </List>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <List className="p-0">
                                {profileData.website && (
                                    <ListItem className="px-0">
                                        <ListItemIcon className="min-w-[40px]">
                                            <LanguageIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Website"
                                            secondary={
                                                <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                    {profileData.website}
                                                </a>
                                            }
                                        />
                                    </ListItem>
                                )}

                                <ListItem className="px-0">
                                    <ListItemIcon className="min-w-[40px]">
                                        <StarIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Đánh giá trung bình"
                                        secondary={`${profileData.averageRating}/5.0 từ các khóa học`}
                                    />
                                </ListItem>

                                <ListItem className="px-0">
                                    <ListItemIcon className="min-w-[40px]">
                                        <SchoolIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Chức danh"
                                        secondary={profileData.title}
                                    />
                                </ListItem>

                                <ListItem className="px-0">
                                    <ListItemText
                                        primary="Ngày tham gia"
                                        secondary={profileData.joinDate}
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>

                    <Divider className="my-4" />

                    <Typography variant="h6" className="mb-3">
                        Ngôn ngữ
                    </Typography>
                    <div className="flex gap-2 flex-wrap">
                        {profileData.languages.map((language) => (
                            <Chip
                                key={language}
                                label={language}
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                    </div>

                    <Divider className="my-4" />

                    <Typography variant="h6" className="mb-3">
                        Mạng xã hội
                    </Typography>
                    <div className="flex gap-4">
                        {profileData.linkedin && (
                            <IconButton
                                color="primary"
                                component="a"
                                href={profileData.linkedin}
                                target="_blank"
                            >
                                <LinkedInIcon fontSize="large" />
                            </IconButton>
                        )}
                        {profileData.facebook && (
                            <IconButton
                                color="primary"
                                component="a"
                                href={profileData.facebook}
                                target="_blank"
                            >
                                <FacebookIcon fontSize="large" />
                            </IconButton>
                        )}
                        {profileData.twitter && (
                            <IconButton
                                color="primary"
                                component="a"
                                href={profileData.twitter}
                                target="_blank"
                            >
                                <TwitterIcon fontSize="large" />
                            </IconButton>
                        )}
                        {profileData.github && (
                            <IconButton
                                color="primary"
                                component="a"
                                href={profileData.github}
                                target="_blank"
                            >
                                <GitHubIcon fontSize="large" />
                            </IconButton>
                        )}
                    </div>
                </div>
            );
        }
    };

    const renderSecurityTab = () => {
        return (
            <div className="space-y-6">
                <Paper className="p-6">
                    <Typography variant="h6" className="mb-4">Đổi mật khẩu</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                type="password"
                                label="Mật khẩu hiện tại"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div></div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                type="password"
                                label="Mật khẩu mới"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                type="password"
                                label="Xác nhận mật khẩu mới"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" color="primary" className="mt-4">
                        Cập nhật mật khẩu
                    </Button>
                </Paper>

                <Paper className="p-6">
                    <Typography variant="h6" className="mb-4">Xác thực hai yếu tố</Typography>
                    <Typography variant="body1" className="mb-4">
                        Thêm một lớp bảo mật khác cho tài khoản của bạn bằng cách kích hoạt xác thực hai yếu tố.
                    </Typography>
                    <Button variant="outlined" color="primary">
                        Thiết lập xác thực hai yếu tố
                    </Button>
                </Paper>

                <Paper className="p-6">
                    <Typography variant="h6" className="mb-4" color="error">Xóa tài khoản</Typography>
                    <Typography variant="body1" className="mb-4">
                        Khi bạn xóa tài khoản, tất cả thông tin cá nhân sẽ bị xóa vĩnh viễn. Các khóa học bạn đã tạo sẽ không còn được hiển thị.
                    </Typography>
                    <Button variant="outlined" color="error">
                        Xóa tài khoản của tôi
                    </Button>
                </Paper>
            </div>
        );
    };

    const renderNotificationsTab = () => {
        return (
            <div className="space-y-6">
                <Paper className="p-6">
                    <Typography variant="h6" className="mb-4">Cài đặt thông báo</Typography>

                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <NotificationsIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Thông báo về học viên mới"
                                secondary="Nhận thông báo khi có học viên mới đăng ký khóa học của bạn"
                            />
                            <Chip label="Email" className="mr-2" />
                            <Chip label="Trong ứng dụng" color="primary" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <NotificationsIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Thông báo về câu hỏi mới"
                                secondary="Nhận thông báo khi học viên đặt câu hỏi mới trong khóa học của bạn"
                            />
                            <Chip label="Email" className="mr-2" />
                            <Chip label="Trong ứng dụng" color="primary" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <NotificationsIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Thông báo về đánh giá mới"
                                secondary="Nhận thông báo khi có đánh giá mới cho khóa học của bạn"
                            />
                            <Chip label="Email" className="mr-2" />
                            <Chip label="Trong ứng dụng" color="primary" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <NotificationsIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Cập nhật từ hệ thống"
                                secondary="Thông báo về cập nhật tính năng mới từ nền tảng"
                            />
                            <Chip label="Email" className="mr-2" />
                            <Chip label="Trong ứng dụng" color="primary" />
                        </ListItem>
                    </List>

                    <Button variant="contained" color="primary" className="mt-4">
                        Lưu cài đặt
                    </Button>
                </Paper>
            </div>
        );
    };

    const tabContent = () => {
        switch (tabValue) {
            case 0:
                return renderPersonalInfoTab();
            case 1:
                return renderSecurityTab();
            case 2:
                return renderNotificationsTab();
            default:
                return renderPersonalInfoTab();
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <Button
                variant="text"
                color="primary"
                onClick={() => navigate(-1)}
                className="mb-6"
            >
                &larr; Quay lại
            </Button>

            <Box className="flex items-center mb-8">
                <Typography variant="h4" component="h1" className="text-gray-800">
                    Hồ sơ của tôi
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Left column - Profile card */}
                <Grid item xs={12} md={4}>
                    <Card className="mb-6">
                        <Box className="flex flex-col items-center p-6 text-center">
                            <Avatar
                                src={profileData.avatarUrl}
                                alt={profileData.fullName}
                                sx={{ width: 120, height: 120, mb: 2 }}
                            />
                            <Typography variant="h5" className="font-semibold mb-1">
                                {profileData.fullName}
                            </Typography>
                            <Typography variant="body1" className="text-gray-600 mb-3">
                                {profileData.title}
                            </Typography>
                            <Chip
                                label={profileData.role}
                                color="primary"
                                variant="outlined"
                                className="mb-4"
                            />
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleEditToggle}
                                startIcon={<EditIcon />}
                            >
                                Thay đổi ảnh đại diện
                            </Button>
                        </Box>

                        <Divider />

                        <Box className="p-6">
                            <Typography variant="h6" className="mb-4">
                                Thống kê
                            </Typography>
                            <Grid container spacing={2}>
                                {stats.map((stat, index) => (
                                    <Grid item xs={4} key={index} className="text-center">
                                        <Typography variant="h6" className="font-bold">
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body2" className="text-gray-500">
                                            {stat.label}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        <Divider />

                        <Box className="p-6">
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => navigate("/my-courses")}
                            >
                                Quản lý khóa học
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                className="mt-2"
                                onClick={() => navigate("/create-course")}
                            >
                                Tạo khóa học mới
                            </Button>
                        </Box>
                    </Card>
                </Grid>

                {/* Right column - Tabs & Content */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <Box className="border-b border-gray-200">
                            <Tabs
                                value={tabValue}
                                onChange={handleChangeTab}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                            >
                                <Tab
                                    label="Thông tin cá nhân"
                                    icon={<AccountCircleIcon />}
                                    iconPosition="start"
                                />
                                <Tab
                                    label="Bảo mật"
                                    icon={<LockIcon />}
                                    iconPosition="start"
                                />
                                <Tab
                                    label="Thông báo"
                                    icon={<NotificationsIcon />}
                                    iconPosition="start"
                                />
                            </Tabs>
                        </Box>

                        <Box className="p-6">
                            {tabContent()}
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default InstructorProfile;