import React, { useState, useEffect } from 'react'
import {
    ClockIcon,
    BarChartIcon,
    BookOpenIcon,
    ListOrderedIcon,
    CheckCircleIcon,
    PlayIcon
} from 'lucide-react'
import { useSelector } from 'react-redux'
import StudentService from '../../../services/student.service'

export const VideoLesson = ({ lesson, onComplete }) => {
    const [lessonStatus, setLessonStatus] = useState('')
    const [progressID, setProgressID] = useState(null)
    const [loading, setLoading] = useState(false)
    const [startLoading, setStartLoading] = useState(false)
    const [completeLoading, setCompleteLoading] = useState(false)
    const user = useSelector((state) => state.auth)

    const lessonData = lesson 

    const handleStartLesson = async () => {
        if (!user?.UserID || !lessonData?.LessonID) return

        setStartLoading(true)
        try {
            const response = await StudentService.progress.startLearnProgress(
                user.UserID,
                lessonData.LessonID
            )

            if (response.success && response.data) {
                setProgressID(response.data.ProgressID || response.data[0]?.ProgressID)
                setLessonStatus('InProcess')
            }
        } catch (error) {
            console.error('Error starting lesson:', error)
        } finally {
            setStartLoading(false)
        }
    }

    const handleLessonComplete = async () => {
        if (!user?.UserID || !lessonData?.LessonID) return

        setCompleteLoading(true)
        try {
            const response = await StudentService.progress.updateLearnProgress(
                user.UserID,
                lessonData.LessonID,
                'Done'
            )

            if (response.success) {
                // setLessonStatus('Done')
                if (onComplete) {
                    onComplete(lessonData.LessonID)
                }
            }
        } catch (error) {
            console.error('Error completing lesson:', error)
        } finally {
            setCompleteLoading(false)
        }
    }

    // Use useEffect to check lesson status when component mounts
    useEffect(() => {
        const checkLessonStatus = async () => {
            if (!user?.UserID || !lessonData?.LessonID) return

            setLoading(true)
            try {
                const response = await StudentService.progress.checkProcessStatus(
                    user.UserID,
                    lessonData.LessonID
                )

                if (response.success && response.data) {
                    setLessonStatus(response.data[0].ProcessStatus || 'NotStarted')
                    setProgressID(response.data[0].ProgressID)
                }
            } catch (error) {
                console.error('Error checking lesson status:', error)
            } finally {
                setLoading(false)
            }
        }
        handleStartLesson()
        checkLessonStatus()
    }, [user?.UserID, lessonData?.LessonID])

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
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${lessonStatus === 'Done'
                            ? 'bg-green-100 text-green-800'
                            : lessonStatus === 'InProcess'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {lessonStatus === 'Done'
                                ? 'Completed'
                                : lessonStatus === 'InProcess'
                                    ? 'In Progress'
                                    : 'Not Started'}
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
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex space-x-6 mb-4 sm:mb-0">
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
                        <div className="flex space-x-3">
                            {/* Start Learning Button - Always shown with appropriate state */}
                            {/* <button
                                onClick={handleStartLesson}
                                disabled={startLoading || !user?.UserID || lessonStatus === 'Done'}
                                className={`flex items-center px-4 py-2 rounded-md font-medium shadow-sm text-white ${startLoading
                                    ? 'bg-blue-400 cursor-wait'
                                    : lessonStatus === 'Done'
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                <PlayIcon className="h-5 w-5 mr-2" />
                                {startLoading
                                    ? 'Processing...'
                                    : lessonStatus === 'InProcess'
                                        ? 'Continue Learning'
                                        : lessonStatus === 'Done'
                                            ? 'Started'
                                            : 'Start Learning'}
                            </button> */}

                            {/* Complete Lesson Button - Always enabled except when already completed */}
                            <button
                                onClick={handleLessonComplete}
                                disabled={completeLoading || lessonStatus === 'Done'}
                                className={`flex items-center px-4 py-2 rounded-md font-medium shadow-sm text-white ${completeLoading
                                    ? 'bg-green-400 cursor-wait'
                                    : lessonStatus === 'Done'
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700'
                                    }`}
                            >
                                <CheckCircleIcon className="h-5 w-5 mr-2" />
                                {completeLoading
                                    ? 'Processing...'
                                    : lessonStatus === 'Done'
                                        ? 'Completed'
                                        : 'Mark as Complete'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoLesson