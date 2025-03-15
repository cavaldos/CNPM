import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Avatar,
    CircularProgress,
    Card,
    CardHeader,
    IconButton
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";

const DiscussionForum = () => {
    const { courseId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [courseInfo, setCourseInfo] = useState(null);
    const messagesEndRef = useRef(null);

    // Mock data for course
    const mockCourseInfo = {
        id: courseId,
        title: "Nhập môn lập trình Python" // This would come from API
    };

    // Mock data for messages
    const mockMessages = [
        {
            id: 1,
            sender: {
                id: 101,
                name: "Nguyễn Văn A",
                avatar: "https://i.pravatar.cc/150?img=1",
                role: "instructor"
            },
            content: "Chào mừng mọi người đến với diễn đàn thảo luận của khóa học!",
            timestamp: new Date(2023, 10, 1, 9, 30).toISOString()
        },
        {
            id: 2,
            sender: {
                id: 202,
                name: "Trần Thị B",
                avatar: "https://i.pravatar.cc/150?img=5",
                role: "student"
            },
            content: "Thầy ơi, em có thắc mắc về bài tập tuần trước, làm sao để giải quyết vấn đề về biến trong Python ạ?",
            timestamp: new Date(2023, 10, 1, 10, 15).toISOString()
        },
        {
            id: 3,
            sender: {
                id: 101,
                name: "Nguyễn Văn A",
                avatar: "https://i.pravatar.cc/150?img=1",
                role: "instructor"
            },
            content: "Bạn có thể mô tả rõ hơn vấn đề bạn đang gặp phải không?",
            timestamp: new Date(2023, 10, 1, 10, 20).toISOString()
        },
        {
            id: 4,
            sender: {
                id: 303,
                name: "Lê Văn C",
                avatar: "https://i.pravatar.cc/150?img=8",
                role: "student"
            },
            content: "Em cũng đang gặp vấn đề tương tự. Khi em cố gắng truy cập một biến từ hàm khác, Python báo lỗi biến chưa được định nghĩa.",
            timestamp: new Date(2023, 10, 1, 10, 30).toISOString()
        }
    ];

    useEffect(() => {
        // Simulate API call to get course info and messages
        setTimeout(() => {
            setCourseInfo(mockCourseInfo);
            setMessages(mockMessages);
            setLoading(false);
        }, 800);
    }, [courseId]);

    useEffect(() => {
        // Scroll to the bottom whenever messages change
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleRefresh = () => {
        setRefreshing(true);
        // Simulate refreshing messages from API
        setTimeout(() => {
            // Here we could add new messages if needed
            setRefreshing(false);
        }, 1000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newMessage.trim()) return;

        // Add new message to the list (in a real app, this would be sent to an API)
        const newMsg = {
            id: Date.now(),
            sender: {
                id: 202,
                name: "Trần Thị B", // This would be the current user
                avatar: "https://i.pravatar.cc/150?img=5",
                role: "student"
            },
            content: newMessage,
            timestamp: new Date().toISOString()
        };

        setMessages([...messages, newMsg]);
        setNewMessage("");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box className="max-w-6xl mx-auto p-4">
            <Card className="mb-4">
                <CardHeader
                    title={`Diễn đàn thảo luận: ${courseInfo?.title || 'Khóa học'}`}
                    subheader="Đặt câu hỏi và trao đổi với giảng viên và các học viên khác"
                    action={
                        <IconButton
                            aria-label="refresh"
                            onClick={handleRefresh}
                            disabled={refreshing}
                        >
                            {refreshing ? <CircularProgress size={24} /> : <RefreshIcon />}
                        </IconButton>
                    }
                />
            </Card>

            <Paper
                elevation={3}
                className="mb-4"
                sx={{
                    height: "calc(100vh - 300px)",
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Box className="p-4 flex-grow">
                    {messages.length === 0 ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                            <Typography color="textSecondary">
                                Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!
                            </Typography>
                        </Box>
                    ) : (
                        messages.map((message) => (
                            <Box
                                key={message.id}
                                className="mb-4 flex"
                            >
                                <Box className="flex max-w-[80%]">
                                    <Avatar
                                        src={message.sender.avatar}
                                        alt={message.sender.name}
                                        className="mr-3 mt-1"
                                    />
                                    <Box>
                                        <Box className="flex items-center mb-1">
                                            <Typography variant="subtitle2" className="font-semibold mr-2">
                                                {message.sender.name}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {formatDate(message.timestamp)}
                                            </Typography>
                                            {message.sender.role === 'instructor' && (
                                                <Typography
                                                    variant="caption"
                                                    className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                                                >
                                                    Giảng viên
                                                </Typography>
                                            )}
                                        </Box>
                                        <Paper
                                            elevation={0}
                                            className={`p-3 rounded-lg ${message.sender.role === 'instructor'
                                                    ? 'bg-blue-50'
                                                    : 'bg-gray-100'
                                                }`}
                                        >
                                            <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
                                                {message.content}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </Box>
            </Paper>

            <Paper className="p-3" component="form" onSubmit={handleSubmit}>
                <Box className="flex items-center">
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Nhập câu hỏi hoặc ý kiến của bạn..."
                        variant="outlined"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon />}
                        disabled={!newMessage.trim()}
                        type="submit"
                        sx={{ ml: 2, height: 56 }}
                    >
                        Gửi
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default DiscussionForum;