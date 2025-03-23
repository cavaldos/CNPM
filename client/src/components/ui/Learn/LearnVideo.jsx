import React, { useState } from 'react'
import {
    ClockIcon,
    BarChartIcon,
    BookOpenIcon,
    ListOrderedIcon,
    CheckCircleIcon
} from 'lucide-react'

export const VideoLesson = ({ lesson, onComplete }) => {
    const [lessonStatus, setLessonStatus] = useState('NotStarted')

    const lessonData = lesson || {
        LessonID: '1',
        LessonTitle: 'Introduction to React',
        Duration: '45 minutes',
        ComplexityLevel: 'Beginner',
        LessonType: 'Video',
        Topic: 'React Basics',
        Ordinal: '1',
        Content: 'https://www.youtube.com/embed/BsdSAn4NpIk',
    }

    const handleLessonComplete = () => {
        setLessonStatus('Completed')
        if (onComplete) {
            onComplete(lessonData.LessonID)
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen w-full">
            <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {/* Lesson header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <ListOrderedIcon className="h-4 w-4 mr-1" />
                            <span>Lesson {lessonData.Ordinal}</span>
                            <span className="mx-2">•</span>
                            <BookOpenIcon className="h-4 w-4 mr-1" />
                            <span>{lessonData.Topic}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${lessonStatus === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {lessonStatus === 'Completed' ? 'Completed' : 'Not Started'}
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {lessonData.LessonTitle}
                    </h1>
                </div>
                {/* Video player */}
                <div className="w-full aspect-video bg-black rounded-lg shadow-lg mb-6 overflow-hidden">
                    <iframe
                        className="w-full h-full"
                        src={lessonData.Content}
                        title={lessonData.LessonTitle}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                {/* Simplified lesson metadata */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-6">
                            <div className="flex items-center">
                                <ClockIcon className="h-5 w-5 text-blue-600 mr-2" />
                                <div>
                                    <p className="font-medium">{lessonData.Duration}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <BarChartIcon className="h-5 w-5 text-blue-600 mr-2" />
                                <div>
                                    <p className="font-medium">{lessonData.ComplexityLevel}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLessonComplete}
                            disabled={lessonStatus === 'Completed'}
                            className={`flex items-center px-4 py-2 rounded-md font-medium shadow-sm text-white ${lessonStatus === 'Completed'
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            <CheckCircleIcon className="h-5 w-5 mr-2" />
                            {lessonStatus === 'Completed' ? 'Đã học xong' : 'Đánh dấu đã học xong'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoLesson