import React, { useState } from 'react';

const NewTaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [status, setStatus] = useState('toDo'); // Default to 'toDo'

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title.trim()) {
            const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            onAddTask({ title, tags: tagsArray, status });
            setTitle('');
            setTags('');
            setStatus('toDo'); // Reset status after adding
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col">
            <div className="mb-2">
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline mr-2 bg-white dark:bg-gray-700"
                />
            </div>
            <div className="mb-2">
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline mr-2 bg-white dark:bg-gray-700"
                />
            </div>
            <div className="mb-2">
                <label htmlFor="status" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">Initial Status:</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-700"
                >
                    <option value="toDo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Add Task
            </button>
        </form>
    );
};

export default NewTaskForm;