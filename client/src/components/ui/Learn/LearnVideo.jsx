import React from "react";
import { Tag } from "antd";

function LearnProcessVideo({ lesson }) {
    // Sử dụng dữ liệu từ props hoặc dùng dữ liệu ví dụ nếu không có
    const lessonData = lesson || {
        LessonID: "1",
        LessonTitle: "Introduction to React",
        Duration: "45 minutes",
        ComplexityLevel: "Beginner",
        CreatedTime: "2023-08-01 10:00:00",
        UpdatedTime: "2023-08-02 12:00:00",
        LessonType: "Video",
        Topic: "React Basics",
        Ordinal: "1",
        Content: "https://www.youtube.com/embed/BsdSAn4NpIk",
    };

    // Xử lý hiển thị các thông tin
    const title = lessonData.Title || lessonData.LessonTitle || "Unknown Title";
    const topic = lessonData.Topic || "No Topic";
    const duration = typeof lessonData.Duration === "number"
        ? `${lessonData.Duration} minutes`
        : lessonData.Duration || "Unknown Duration";
    const complexity = lessonData.ComplexityLevel || "Unknown Complexity";
    const type = lessonData.LessonType || "Video";

    // Xử lý URL video
    const videoUrl = lessonData.Content || "https://www.youtube.com/embed/BsdSAn4NpIk";

    return (
        <div className="w-full min-h-[500px] p-6 bg-white rounded-[5px] border border-blue-600 shadow-lg flex flex-col gap-3">
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

            <iframe
                src={videoUrl}
                title={title}
                className="w-auto h-[500px] rounded-lg shadow-lg mx-4"
                related="0"
                rel="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                showinfo="0"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default LearnProcessVideo;
