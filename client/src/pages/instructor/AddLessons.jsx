import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaVideo, FaFileAlt, FaTrash, FaGripVertical, FaArrowLeft, FaSave, FaUpload, FaLink } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Popconfirm } from 'antd';

import InstructorService from '../../services/instructor.service';
import { useSelector } from 'react-redux';

const AddLessons = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        type: 'video',
        content: '',
        description: '',
        complexity: 'Easy', // Default complexity level
        duration: 30 // Default duration in minutes
    });
    const [courseName, setCourseName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.auth);

    // Video upload states
    const [uploadMode, setUploadMode] = useState('link'); // 'link' or 'upload'
    const [dragActive, setDragActive] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const fileInputRef = useRef(null);

    // Ref for lesson list scrolling
    const lessonListRef = useRef(null);

    // Fetch course data when component loads
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await InstructorService.getCourseByID(courseId);
                if (response.data) {
                    setCourseName(response.data.Title || `Course #${courseId}`);
                }
            } catch (err) {
                console.error("Error fetching course:", err);
                setCourseName(`Course #${courseId}`);
            }
        };

        if (courseId) {
            fetchCourseData();
        }
    }, [courseId]);

    useEffect(() => {
        const fetchLessons = async () => {
            setIsLoading(true);
            try {
                const response = await InstructorService.getAllLessonsByCourseID(courseId);
                if (response.data) {
                    setLessons(response.data);
                }
            } catch (error) {
                console.error("Error fetching lessons:", error);
                setError("Failed to load lessons");
            } finally {
                setIsLoading(false);
            }
        };
        fetchLessons();
    }, [courseId]);

    // Scroll to the bottom of lesson list after adding a new lesson
    useEffect(() => {
        if (lessonListRef.current) {
            lessonListRef.current.scrollTop = lessonListRef.current.scrollHeight;
        }
    }, [lessons.length]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle file drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // Handle file drop
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleVideoFile(e.dataTransfer.files[0]);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleVideoFile(e.target.files[0]);
        }
    };

    // Process the video file
    const handleVideoFile = (file) => {
        if (file.type.startsWith('video/')) {
            setVideoFile(file);
            // Here you would normally upload the file to your server or cloud storage
            // For now, we'll just store the file object and display its name
            setFormData(prev => ({
                ...prev,
                content: `Uploaded: ${file.name}`
            }));
        } else {
            setError("Please upload a valid video file");
        }
    };

    // Toggle between link and upload modes
    const toggleUploadMode = (mode) => {
        setUploadMode(mode);
        // Clear content when switching modes
        setFormData(prev => ({
            ...prev,
            content: ''
        }));
        setVideoFile(null);
    };

    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title) return;

        // For video type with link mode, content must be provided
        if (formData.type === 'video' && uploadMode === 'link' && !formData.content) {
            setError("Video URL is required");
            return;
        }

        // For video type with upload mode, a file must be selected
        if (formData.type === 'video' && uploadMode === 'upload' && !videoFile) {
            setError("Please select a video file to upload");
            return;
        }

        setIsLoading(true);
        try {
            let response;
            let videoUrl = formData.content;

            // If we're in upload mode, we need to upload the file first
            if (formData.type === 'video' && uploadMode === 'upload' && videoFile) {

                // For now, we'll just pretend we have a URL
                videoUrl = `https://example.com/videos/${videoFile.name}`;

            }

            if (formData.type === 'video') {
                // Call API with individual parameters instead of object
                response = await InstructorService.createLessonVideo(
                    formData.title,
                    formData.duration,
                    formData.complexity,
                    "Video",
                    lessons.length + 1,
                    courseId,
                    videoUrl
                );
            } else {
                // Call API with individual parameters instead of object
                response = await InstructorService.createLessonDocument(
                    formData.title,
                    formData.duration,
                    formData.complexity,
                    "Document",
                    lessons.length + 1,
                    formData.content || "Empty document content",
                    courseId
                );
            }

            console.log("Lesson created successfully:", response);

            // Reset form
            setFormData({
                title: '',
                type: 'video',
                content: '',
                description: '',
                complexity: 'Easy',
                duration: 30
            });
            setVideoFile(null);
            setError(null);

            // Fetch the updated list of lessons to ensure we have the latest data
            await refreshLessonList();

        } catch (error) {
            console.error("Error creating lesson:", error);
            setError("Failed to create lesson");
        } finally {
            setIsLoading(false);
        }
    };

    // Function to refresh the lesson list
    const refreshLessonList = async () => {
        try {
            const response = await InstructorService.getAllLessonsByCourseID(courseId);
            if (response.data) {
                setLessons(response.data);
            }
        } catch (error) {
            console.error("Error refreshing lesson list:", error);
        }
    };

    const handleDelete = async (lessonId) => {
        setIsLoading(true);
        try {
            await InstructorService.deleteLesson(lessonId);
            // Refresh lesson list after deletion
            refreshLessonList();
        } catch (error) {
            console.error("Error deleting lesson:", error);
            setError("Failed to delete lesson");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle drag and drop to reorder lessons
    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const items = Array.from(lessons);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Update the local state first for a responsive UI
        setLessons(items);

        // Update the ordinal positions in the backend
        try {
            // Iterate through all lessons and update their ordinal positions
            for (let i = 0; i < items.length; i++) {
                await InstructorService.sortLessons(items[i].LessonID, i + 1);
            }
        } catch (error) {
            console.error("Error updating lesson order:", error);
            setError("Failed to update lesson order");

            // If there's an error, refetch the lessons to restore the correct order
            const response = await InstructorService.getAllLessonsByCourseID(courseId);
            if (response.data) {
                setLessons(response.data);
            }
        }
    };


    // Go back to course edit page
    const handleBackToCourse = () => {
        navigate(-1);

    };

    return (
        <div className="flex min-h-[70vh] bg-gray-50 p-6 flex-col ">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="text-2xl font-bold">Add Lessons to Course</h1>
                    <p className="text-gray-600">{courseName}</p>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={handleBackToCourse}
                        className="px-4 py-2 flex items-center gap-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        <FaArrowLeft /> Back to Course
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                </div>
            )}

            <div className="flex gap-6">
                {/* Form Section - 2/3 width */}
                <div className="w-2/3 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6">Add New Lesson</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lesson Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter lesson title"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Lesson Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="video">Video</option>
                                <option value="document">Document</option>
                            </select>
                        </div>

                        {/* Complexity and duration fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Complexity Level
                                </label>
                                <select
                                    name="complexity"
                                    value={formData.complexity}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration (minutes)
                                </label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="1"
                                    max="300"
                                />
                            </div>
                        </div>

                        {/* Content section - changes based on lesson type */}
                        {formData.type === 'video' ? (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Video
                                </label>
                                <div className="flex mb-2 space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => toggleUploadMode('link')}
                                        className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 ${uploadMode === 'link'
                                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                            : 'bg-gray-100 text-gray-700 border border-gray-300'
                                            }`}
                                    >
                                        <FaLink /> Enter URL
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => toggleUploadMode('upload')}
                                        className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 ${uploadMode === 'upload'
                                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                            : 'bg-gray-100 text-gray-700 border border-gray-300'
                                            }`}
                                    >
                                        <FaUpload /> Upload Video
                                    </button>
                                </div>

                                {uploadMode === 'link' ? (
                                    <input
                                        type="text"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter video URL"
                                        required
                                    />
                                ) : (
                                    <div
                                        className={`border-2 border-dashed rounded-md p-6 text-center ${dragActive
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        onClick={triggerFileInput}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="video/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        {videoFile ? (
                                            <div className="space-y-2">
                                                <FaVideo className="mx-auto text-3xl text-blue-500" />
                                                <p className="text-sm font-medium">{videoFile.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                                                </p>
                                                <button
                                                    type="button"
                                                    className="text-xs text-red-600 hover:text-red-800"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setVideoFile(null);
                                                        setFormData(prev => ({ ...prev, content: '' }));
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <FaUpload className="mx-auto text-3xl text-gray-400" />
                                                <p className="text-sm font-medium">
                                                    Drag and drop your video here or click to browse
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Supports: MP4, WebM, Ogg (Max 500MB)
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Document Content
                                </label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="6"
                                    placeholder="Enter document content"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                placeholder="Enter lesson description"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Adding...' : 'Add Lesson'}
                        </button>
                    </form>
                </div>

                {/* List Section - 1/3 width */}
                <div className="w-1/3 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6">Lesson List</h2>
                    <div className="flex items-center mb-4">
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            <span className="font-medium">Hover over</span>
                            <FaGripVertical className="text-gray-400" />
                            <span className="font-medium"> to drag and drop</span>
                        </p>
                    </div>

                    {isLoading && lessons.length === 0 ? (
                        <div className="text-center py-10">
                            <p>Loading lessons...</p>
                        </div>
                    ) : (
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="lessons">
                                {(provided) => (
                                    <div
                                        className="space-y-3 max-h-[500px] overflow-y-auto pr-2"
                                        {...provided.droppableProps}
                                        ref={(el) => {
                                            provided.innerRef(el);
                                            lessonListRef.current = el;
                                        }}
                                        style={{
                                            scrollBehavior: 'smooth'
                                        }}
                                    >
                                        {lessons.length === 0 && (
                                            <p className="text-gray-500 text-center py-4">
                                                No lessons added yet
                                            </p>
                                        )}

                                        {lessons.map((lesson, index) => (
                                            <Draggable
                                                key={lesson.LessonID}
                                                draggableId={String(lesson.LessonID)}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={`flex items-start space-x-3 p-4 border border-gray-200 rounded-lg lesson-item ${snapshot.isDragging ? 'bg-blue-100 shadow-lg' : 'bg-white hover:bg-gray-50'}`}
                                                    >
                                                        <div
                                                            className="flex-shrink-0 cursor-grab active:cursor-grabbing mt-1"
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <FaGripVertical className="text-gray-400" />
                                                        </div>
                                                        <div className="flex-shrink-0 mt-1">
                                                            {lesson.LessonType === 'Video' ? (
                                                                <FaVideo className="text-blue-500 text-xl" />
                                                            ) : (
                                                                <FaFileAlt className="text-green-500 text-xl" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                {index + 1}. {lesson.Title}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {lesson.Duration} min | {lesson.ComplexityLevel || 'Easy'}
                                                            </p>
                                                        </div>
                                                        <Popconfirm
                                                            title="Delete the lesson"
                                                            description="Are you sure you want to delete this lesson?"
                                                            onConfirm={() => handleDelete(lesson.LessonID)}
                                                            okText="Yes"
                                                            cancelText="No"
                                                        >
                                                            <button
                                                                className="flex-shrink-0 text-red-500 hover:text-red-700"
                                                                aria-label="Delete lesson"
                                                                title="Delete"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </Popconfirm>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    )}

                    {lessons.length > 0 && (
                        <div className="mt-6 text-right">
                            <span className="text-sm text-gray-500">
                                Total: {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddLessons;