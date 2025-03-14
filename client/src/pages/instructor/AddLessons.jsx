import React, { useState } from 'react';
import { FaVideo, FaFileAlt, FaTrash, FaGripVertical } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const AddLessons = () => {
    const [lessons, setLessons] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        type: 'video',
        content: '',
        description: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.content) return;
        const newLesson = {
            id: Date.now().toString(),
            ...formData
        };
        setLessons(prev => [...prev, newLesson]);
        setFormData({
            title: '',
            type: 'video',
            content: '',
            description: ''
        });
    };

    const handleDelete = (id) => {
        setLessons(prev => prev.filter(lesson => lesson.id !== id));
    };

    // Xử lý khi kết thúc kéo thả
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(lessons);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setLessons(items);
    };

    return (
        <div className="flex min-h-screen bg-gray-50 p-6 gap-6">
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {formData.type === 'video' ? 'Video URL' : 'Document URL'}
                        </label>
                        <input
                            type="text"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={formData.type === 'video' ? 'Enter video URL' : 'Enter document URL'}
                        />
                    </div>
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
                    >
                        Add Lesson
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

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="lessons">
                        {(provided) => (
                            <div
                                className="space-y-3"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {lessons.length === 0 && (
                                    <p className="text-gray-500 text-center py-4">
                                        No lessons added yet
                                    </p>
                                )}

                                {lessons.map((lesson, index) => (
                                    <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={`flex items-start space-x-3 p-4 border border-gray-200 rounded-lg lesson-item ${snapshot.isDragging ? 'bg-blue-100 shadow-lg' : 'bg-white hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div
                                                    className="flex-shrink-0 cursor-grab active:cursor-grabbing mt-1"
                                                    {...provided.dragHandleProps}
                                                >
                                                    <FaGripVertical className="text-gray-400" />
                                                </div>
                                                <div className="flex-shrink-0 mt-1">
                                                    {lesson.type === 'video' ? (
                                                        <FaVideo className="text-blue-500 text-xl" />
                                                    ) : (
                                                        <FaFileAlt className="text-green-500 text-xl" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {index + 1}. {lesson.title}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {lesson.description || 'No description'}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(lesson.id)}
                                                    className="flex-shrink-0 text-red-500 hover:text-red-700"
                                                    aria-label="Delete lesson"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {lessons.length > 0 && (
                    <div className="mt-6 text-right">
                        <span className="text-sm text-gray-500">
                            Total: {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddLessons;