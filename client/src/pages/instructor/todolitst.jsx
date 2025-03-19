import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

function TodoList() {
    const [todos, setTodos] = useState([
        { id: '1', text: 'Học React' },
        { id: '2', text: 'Làm bài tập' },
        { id: '3', text: 'Viết blog' },
    ]);
    const [newTodo, setNewTodo] = useState('');

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTodos(items);
    };

    const addTodo = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        setTodos([
            ...todos,
            { id: Date.now().toString(), text: newTodo }
        ]);
        setNewTodo('');
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Todo List
                </h1>

                <form onSubmit={addTodo} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Thêm công việc mới..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </form>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="todos">
                        {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-2"
                            >
                                {todos.map((todo, index) => (
                                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-gray-800">{todo.text}</span>
                                                </div>
                                                <button
                                                    onClick={() => deleteTodo(todo.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}

export default TodoList;