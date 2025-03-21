import React from "react";
import { Tag } from "antd";
import { List, Card } from "antd";

const PageDocumentList = ({ pages }) => {
    return (
        <div className="w-full min-h-[250px]">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Page Documents</h2>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={pages}
                renderItem={(page) => (
                    <List.Item>
                        <Card
                            title={`Page ${page.Page}`}
                            bordered={false}
                            className="shadow-md"
                        >
                            <p className="text-gray-700">{page.Content}</p>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

function LearnProcessDoc({ lesson, pages }) {
    // Sử dụng dữ liệu từ props hoặc dùng dữ liệu ví dụ nếu không có
    const lessonData = lesson || {
        LessonsID: "1",
        Title: "Introduction to React",
        Duration: "45 minutes",
        ComplexityLevel: "Beginner",
        CreatedTime: "2023-08-01 10:00:00",
        UpdatedTime: "2023-08-02 12:00:00",
        LessonType: "Document",
        Topic: "React Basics",
        OrderLessons: "1",
        CourseID: "101",
    };

    // Xử lý hiển thị các thông tin
    const title = lessonData.Title || lessonData.LessonTitle || "Unknown Title";
    const topic = lessonData.Topic || "No Topic";
    const duration = typeof lessonData.Duration === "number"
        ? `${lessonData.Duration} minutes`
        : lessonData.Duration || "Unknown Duration";
    const complexity = lessonData.ComplexityLevel || "Unknown Complexity";
    const type = lessonData.LessonType || "Document";

    // Sử dụng pages từ props hoặc mảng rỗng nếu không có
    const documentPages = pages || [
        {
            PageDocumentID: "1",
            Content: lessonData.Content || "Nội dung của bài học này hiện chưa được cập nhật.",
            Page: 1,
        }
    ];

    return (
        <div className="w-full min-h-[500px] p-6 bg-white rounded-xl shadow-lg flex flex-col gap-2">
            <div className="bg-gray-100 rounded-lg p-4">
                <div className="mb-4">
                    <div className="flex gap-2 items-center">
                        <h3 className="text-lg text-gray-900 font-medium">Lesson Title:</h3>
                        <span className="text-lg font-semibold text-gray-700 italic">
                            {title}
                        </span>
                    </div>
                    <div className="flex gap-2 items-center mt-2">
                        <h3 className="text-lg text-gray-900 font-medium">Topic:</h3>
                        <span className="text-lg font-semibold text-gray-700 italic">
                            {topic}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-3 mb-4">
                    <Tag className="w-auto inline-block max-w-max" color="blue">
                        {`Duration: ${duration}`}
                    </Tag>
                    <Tag className="w-auto inline-block max-w-max" color="green">
                        {`Complexity: ${complexity}`}
                    </Tag>
                    <Tag className="w-auto inline-block max-w-max" color="purple">
                        {`Type: ${type}`}
                    </Tag>
                </div>
            </div>

            <div className="h-full min-h-[250px] w-full rounded-md bg-gray-100 p-4">
                <PageDocumentList pages={documentPages} />
            </div>
        </div>
    );
}


export default LearnProcessDoc;
