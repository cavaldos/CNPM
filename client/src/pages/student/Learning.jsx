import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import LearningLayout from "../../components/ui/Learning/LearningLayout";
import StudentService from "../../services/student.service";
import LearnProcessVideo from "../../components/ui/Learn/LearnVideo";
import LearnProcessDoc from "../../components/ui/Learn/LearnDoc";

/**
 * 
 * @data demo     "data": [
        {
            "LessonID": 4,
            "LessonTitle": "Data Types",
            "LessonType": "Document",
            "Duration": 55,
            "ComplexityLevel": "Medium",
            "Ordinal": 1,
            "CreatedTime": "2025-01-04T11:00:00.000Z",
            "UpdatedTime": "2025-01-04T11:00:00.000Z",
            "Content": null,
            "ResourceID": null
        }
    ]
            "data": [
        {
            "LessonID": 3,
            "LessonTitle": "HTML Basics",
            "LessonType": "Video",
            "Duration": 50,
            "ComplexityLevel": "Easy",
            "Ordinal": 1,
            "CreatedTime": "2025-01-03T17:00:00.000Z",
            "UpdatedTime": "2025-01-03T17:00:00.000Z",
            "Content": "http://video.com/html1",
            "ResourceID": 21
        }
    ]
 */

const LearningPage = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLesson = async () => {
            setLoading(true);
            try {
                const response = await StudentService.lesson.getLessonById(lessonId);
                console.log("response", response.data[0]);
                if (response.success) {
                    // Lấy bài học đầu tiên từ mảng data (hoặc null nếu không có)
                    setLesson(response.data[0] || null);
                } else {
                    setError(response.message || "Không thể tải bài học");
                }
            } catch (error) {
                console.error("Error fetching lesson:", error);
                setError("Đã xảy ra lỗi khi tải bài học");
            } finally {
                setLoading(false);
            }
        };

        if (lessonId) {
            fetchLesson();
        }
    }, [lessonId]);

    // Hiển thị màn hình loading
    if (loading) {
        return (
            <LearningLayout>
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </LearningLayout>
        );
    }

    // Hiển thị lỗi nếu có
    if (error) {
        return (
            <LearningLayout>
                <div className="flex justify-center items-center h-full">
                    <div className="text-red-500 text-center">
                        <p className="text-xl font-bold">Đã xảy ra lỗi</p>
                        <p>{error}</p>
                    </div>
                </div>
            </LearningLayout>
        );
    }

    // Hiển thị thông báo nếu không tìm thấy bài học
    if (!lesson) {
        return (
            <LearningLayout>
                <div className="flex justify-center items-center h-full">
                    <p className="text-xl text-gray-600">Không tìm thấy bài học</p>
                </div>
            </LearningLayout>
        );
    }

    // Tạo dữ liệu demo cho LearnProcessDoc nếu không có nội dung
    const generateDemoPages = () => {
        return [
            {
                PageDocumentID: "1",
                Content: lesson.Content || "Nội dung của bài học này hiện chưa được cập nhật.",
                Page: 1,
            }
        ];
    };

    // Render nội dung dựa trên loại bài học
    const renderLessonContent = () => {
        // Nếu lesson có trường LessonType
        if (lesson.LessonType === "Video") {
            // Sử dụng component LearnProcessVideo và truyền dữ liệu bài học
            return <LearnProcessVideo lesson={lesson} />;
        } else if (lesson.LessonType === "Document" || lesson.LessonType === "Doc") {
            // Sử dụng component LearnProcessDoc và tạo dữ liệu pages nếu cần
            const pages = lesson.pages || generateDemoPages();
            return <LearnProcessDoc lesson={lesson} pages={pages} />;
        } else {
            // Trường hợp không xác định được loại bài học
            return (
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Bài học: {lesson.Title || lesson.LessonTitle}</h2>
                    <p className="text-gray-600">
                        Loại bài học không được hỗ trợ: {lesson.LessonType || "Không xác định"}
                    </p>
                    {lesson.Content && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-md">
                            <div dangerouslySetInnerHTML={{ __html: lesson.Content }} />
                        </div>
                    )}
                </div>
            );
        }
    };

    return (
        <LearningLayout>
            <div className="p-4">
                {renderLessonContent()}
            </div>
        </LearningLayout>
    );
};

export default LearningPage;