import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Button,
    Typography,
    Paper,
    Box,
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    Tabs,
    Tab,
    Alert,
    Grid,
    Chip
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import DescriptionIcon from "@mui/icons-material/Description";
import SaveIcon from "@mui/icons-material/Save";
import VideocamIcon from "@mui/icons-material/Videocam";
import SubjectIcon from "@mui/icons-material/Subject";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import InstructorService from "../../services/instructor.service";

const AddLessons = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [courseData, setCourseData] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [currentLesson, setCurrentLesson] = useState({
        title: "",
        type: "video", // video hoặc document
        content: "",
        videoUrl: "",
        documentContent: ""
    });
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(-1);

    useEffect(() => {
        // Tải thông tin khóa học
        const fetchCourseData = async () => {
            setIsLoading(true);
            try {
                const response = await InstructorService.getCourseByID(courseId);
                if (response && response.data) {
                    setCourseData(response.data);

                    // Tải danh sách bài học nếu có
                    const lessonResponse = await InstructorService.getAllLessonsByCourseID(courseId);
                    if (lessonResponse && lessonResponse.data) {
                        setLessons(lessonResponse.data);
                    }
                } else {
                    throw new Error("Không thể tải thông tin khóa học");
                }
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu khóa học:", error);
                alert("Không thể tải thông tin khóa học. Vui lòng thử lại sau!");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleAddLesson = () => {
        resetForm();
        setDialogOpen(true);
        setEditMode(false);
    };

    const handleEditLesson = (index) => {
        const lesson = lessons[index];
        setCurrentLesson({
            title: lesson.title,
            type: lesson.type,
            content: lesson.content || "",
            videoUrl: lesson.videoUrl || "",
            documentContent: lesson.documentContent || ""
        });
        setEditMode(true);
        setEditIndex(index);
        setDialogOpen(true);
        setTabValue(lesson.type === "video" ? 0 : 1);
    };

    const handleDeleteLesson = async (index) => {
        const lesson = lessons[index];
        if (window.confirm(`Bạn có chắc chắn muốn xóa bài học "${lesson.title}"?`)) {
            try {
                if (lesson.id) {
                    // Nếu bài học đã có ID (đã lưu trên server)
                    await InstructorService.deleteLesson(lesson.id);
                }

                // Xóa khỏi state local
                const updatedLessons = [...lessons];
                updatedLessons.splice(index, 1);
                setLessons(updatedLessons);
            } catch (error) {
                console.error("Lỗi khi xóa bài học:", error);
                alert("Không thể xóa bài học. Vui lòng thử lại sau!");
            }
        }
    };

    const resetForm = () => {
        setCurrentLesson({
            title: "",
            type: "video",
            content: "",
            videoUrl: "",
            documentContent: ""
        });
        setTabValue(0);
    };

    const handleSaveLesson = async () => {
        // Validate dữ liệu
        if (!currentLesson.title) {
            alert("Vui lòng nhập tiêu đề bài học!");
            return;
        }

        if (currentLesson.type === "video" && !currentLesson.videoUrl) {
            alert("Vui lòng nhập URL video!");
            return;
        }

        if (currentLesson.type === "document" && !currentLesson.documentContent) {
            alert("Vui lòng nhập nội dung tài liệu!");
            return;
        }

        try {
            let response;
            let updatedLessons = [...lessons];

            if (editMode) {
                const lessonToUpdate = { ...lessons[editIndex] };

                // Cập nhật bài học
                if (currentLesson.type === "video") {
                    if (lessonToUpdate.id) {
                        // Cập nhật trên server
                        response = await InstructorService.updateLessonVideo(
                            lessonToUpdate.id,
                            currentLesson.videoUrl
                        );
                    }
                    // Cập nhật locally
                    lessonToUpdate.title = currentLesson.title;
                    lessonToUpdate.videoUrl = currentLesson.videoUrl;
                    lessonToUpdate.type = "video";
                } else {
                    if (lessonToUpdate.id) {
                        // Cập nhật trên server
                        response = await InstructorService.updateLessonDocument(
                            lessonToUpdate.id,
                            currentLesson.documentContent
                        );
                    }
                    // Cập nhật locally
                    lessonToUpdate.title = currentLesson.title;
                    lessonToUpdate.documentContent = currentLesson.documentContent;
                    lessonToUpdate.type = "document";
                }

                updatedLessons[editIndex] = lessonToUpdate;
            } else {
                // Tạo bài học mới
                const newLessonData = {
                    title: currentLesson.title,
                    courseId: courseId,
                    ordinal: lessons.length + 1
                };

                if (currentLesson.type === "video") {
                    newLessonData.videoUrl = currentLesson.videoUrl;
                    response = await InstructorService.createLessonVideo(newLessonData);
                } else {
                    newLessonData.documentContent = currentLesson.documentContent;
                    response = await InstructorService.createLessonDocument(newLessonData);
                }

                if (response && response.data) {
                    // Thêm bài học mới vào danh sách
                    updatedLessons.push({
                        id: response.data.lessonId,
                        ...newLessonData
                    });
                }
            }

            setLessons(updatedLessons);
            setDialogOpen(false);
            resetForm();
        } catch (error) {
            console.error("Lỗi khi lưu bài học:", error);
            alert("Đã xảy ra lỗi khi lưu bài học. Vui lòng thử lại!");
        }
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const reorderedLessons = Array.from(lessons);
        const [removed] = reorderedLessons.splice(result.source.index, 1);
        reorderedLessons.splice(result.destination.index, 0, removed);

        setLessons(reorderedLessons);

        // Cập nhật thứ tự trên server
        try {
            for (let i = 0; i < reorderedLessons.length; i++) {
                await InstructorService.sortLessons(reorderedLessons[i].id, i + 1);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật thứ tự:", error);
            alert("Không thể cập nhật thứ tự bài học. Vui lòng thử lại sau!");
        }
    };

    const handleFinish = () => {
        // Hoàn tất quá trình thêm bài học và quay lại trang quản lý khóa học
        navigate('/instructor/manage-courses');
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <Typography variant="h6">Đang tải...</Typography>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/instructor/manage-courses')}
                className="mb-6"
            >
                Quay lại danh sách khóa học
            </Button>

            {courseData && (
                <Paper elevation={3} className="p-6 mb-6">
                    <Typography variant="h4" component="h1" className="mb-4">
                        Thêm bài học cho khóa học: {courseData.title}
                    </Typography>
                    <Typography variant="body1" className="mb-4 text-gray-600">
                        {courseData.description}
                    </Typography>
                </Paper>
            )}

            <Box className="mb-6">
                <Alert severity="info" className="mb-4">
                    Thêm các bài học và sắp xếp thứ tự theo ý muốn bằng cách kéo thả. Đảm bảo nội dung đầy đủ trước khi hoàn tất.
                </Alert>

                <Card className="mb-6">
                    <CardContent>
                        <Box className="flex justify-between items-center mb-4">
                            <Typography variant="h6">Danh sách bài học</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={handleAddLesson}
                            >
                                Thêm bài học
                            </Button>
                        </Box>

                        {lessons.length === 0 ? (
                            <Box className="text-center py-12 bg-gray-50">
                                <VideoLibraryIcon className="text-gray-400" style={{ fontSize: 48 }} />
                                <Typography variant="h6" className="mt-2 text-gray-500">
                                    Chưa có bài học nào
                                </Typography>
                                <Typography variant="body1" className="text-gray-400 mb-4">
                                    Bắt đầu thêm bài học đầu tiên cho khóa học của bạn
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddLesson}
                                >
                                    Thêm bài học đầu tiên
                                </Button>
                            </Box>
                        ) : (
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="lessonList">
                                    {(provided) => (
                                        <List {...provided.droppableProps} ref={provided.innerRef}>
                                            {lessons.map((lesson, index) => (
                                                <Draggable key={lesson.id || `new-${index}`} draggableId={lesson.id?.toString() || `new-${index}`} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                        >
                                                            <Paper className="mb-2 hover:shadow-md transition-shadow">
                                                                <ListItem>
                                                                    <div {...provided.dragHandleProps} className="mr-2">
                                                                        <DragIndicatorIcon className="text-gray-400" />
                                                                    </div>
                                                                    {lesson.type === "video" ? (
                                                                        <VideocamIcon className="mr-2 text-blue-600" />
                                                                    ) : (
                                                                        <SubjectIcon className="mr-2 text-green-600" />
                                                                    )}
                                                                    <ListItemText
                                                                        primary={`${index + 1}. ${lesson.title}`}
                                                                        secondary={lesson.type === "video" ? "Video" : "Tài liệu"}
                                                                    />
                                                                    <ListItemSecondaryAction>
                                                                        <IconButton edge="end" onClick={() => handleEditLesson(index)}>
                                                                            <EditIcon />
                                                                        </IconButton>
                                                                        <IconButton edge="end" onClick={() => handleDeleteLesson(index)}>
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </ListItemSecondaryAction>
                                                                </ListItem>
                                                            </Paper>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </List>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        )}
                    </CardContent>
                </Card>

                <Box className="flex justify-between items-center mt-8">
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/instructor/manage-courses')}
                    >
                        Lưu và chỉnh sửa sau
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircleIcon />}
                        onClick={handleFinish}
                    >
                        Hoàn tất khóa học
                    </Button>
                </Box>
            </Box>

            {/* Dialog thêm/sửa bài học */}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    {editMode ? "Chỉnh sửa bài học" : "Thêm bài học mới"}
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                        label="Tiêu đề bài học"
                        variant="outlined"
                        fullWidth
                        required
                        value={currentLesson.title}
                        onChange={(e) => setCurrentLesson({ ...currentLesson, title: e.target.value })}
                        margin="normal"
                    />

                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, mt: 3 }}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab icon={<VideocamIcon />} label="Video" />
                            <Tab icon={<DescriptionIcon />} label="Tài liệu" />
                        </Tabs>
                    </Box>

                    {tabValue === 0 && (
                        <>
                            <Typography variant="subtitle1" gutterBottom>
                                Thêm video bài học
                            </Typography>
                            <TextField
                                label="URL Video (YouTube, Vimeo, v.v.)"
                                variant="outlined"
                                fullWidth
                                value={currentLesson.videoUrl}
                                onChange={(e) => setCurrentLesson({ ...currentLesson, videoUrl: e.target.value, type: "video" })}
                                placeholder="VD: https://www.youtube.com/watch?v=..."
                                margin="normal"
                            />

                            {currentLesson.videoUrl && (
                                <Box className="mt-4 p-3 border rounded">
                                    <Typography variant="body2" className="mb-2">
                                        Xem trước URL video:
                                    </Typography>
                                    <Typography variant="body2" className="text-blue-600 break-all">
                                        {currentLesson.videoUrl}
                                    </Typography>
                                </Box>
                            )}
                        </>
                    )}

                    {tabValue === 1 && (
                        <>
                            <Typography variant="subtitle1" gutterBottom>
                                Thêm tài liệu bài học
                            </Typography>
                            <TextField
                                label="Nội dung tài liệu"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={10}
                                value={currentLesson.documentContent}
                                onChange={(e) => setCurrentLesson({ ...currentLesson, documentContent: e.target.value, type: "document" })}
                                margin="normal"
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Hủy</Button>
                    <Button
                        onClick={handleSaveLesson}
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                    >
                        Lưu bài học
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddLessons;