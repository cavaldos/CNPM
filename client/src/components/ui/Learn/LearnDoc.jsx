import React, { useState } from 'react'
import {
    ClockIcon,
    BarChartIcon,
    CalendarIcon,
    BookOpenIcon,
    ListOrderedIcon,
    FileTextIcon,
    BookIcon,
    CheckCircleIcon
} from 'lucide-react'

export const DocumentLesson = ({ lesson, onComplete }) => {
    const [lessonStatus, setLessonStatus] = useState('NotStarted')

    const lessonData = lesson || {
        LessonID: '1',
        LessonTitle: 'Introduction to React',
        Duration: '45 minutes',
        ComplexityLevel: 'Beginner',
        CreatedTime: '2023-08-01 10:00:00',
        UpdatedTime: '2023-08-02 12:00:00',
        LessonType: 'Document',
        Content: null,
        ResourceID: '201',
        Ordinal: 1,
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
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
                {/* Document header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                            <ListOrderedIcon className="h-4 w-4 mr-1" />
                            <span>Lesson {lessonData.Ordinal}</span>
                            <span className="mx-2">•</span>
                            <FileTextIcon className="h-4 w-4 mr-1" />
                            <span>{lessonData.LessonType}</span>
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
                {/* Document content area */}
                <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
                    {lessonData.Content ? (
                        <div className="prose max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: lessonData.Content }} />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center min-h-[300px] border-2 border-dashed border-gray-200 rounded-lg">
                            <div className="text-center p-6">
                                <BookIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-1">
                                    Document Content
                                </h3>
                                <p className="text-sm text-gray-500">
                                    This is where the document content would be displayed. You can
                                    add your document content here.
                                </p>
                            </div>
                        </div>
                    )}
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
                            <div className="flex items-center">
                                <CalendarIcon className="h-5 w-5 text-blue-600 mr-2" />
                                <div>
                                    <p className="font-medium">
                                        {formatDate(lessonData.UpdatedTime)}
                                    </p>
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

export default DocumentLesson