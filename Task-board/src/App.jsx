import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskColumn from './components/TaskColumn';
import NewTaskForm from './components/NewTaskForm';
import SideBar from './components/SideBar';
import Settings from './components/Settings';
import Projects from './components/Projects';
import * as api from './components/services/api';

const LOCAL_STORAGE_KEY = 'taskBoardTasks';

const App = () => {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    const [editingTask, setEditingTask] = useState(null);
    const [activeSidebarItem, setActiveSidebarItem] = useState('Dashboard');
    const [activeFilter, setActiveFilter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterTag, setFilterTag] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadTasksFromLocalStorage();
        fetchTasks();
    }, []);

    useEffect(() => {
        saveTasksToLocalStorage(tasks);
    }, [tasks]);

    const loadTasksFromLocalStorage = () => {
        try {
            const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error("Error loading tasks from local storage:", error);
        }
    };

    const saveTasksToLocalStorage = (currentTasks) => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentTasks));
        } catch (error) {
            console.error("Error saving tasks to local storage:", error);
        }
    };

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.fetchTasks();
            setTasks(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.error("Error fetching tasks from API:", err);
        }
    };

    const handleAddTask = async (newTask) => {
        try {
            const data = await api.addTask(newTask);
            console.log('API Response:', data);
            setTasks([...tasks, data]);
            console.log('Tasks state after adding:', tasks);
        } catch (err) {
            setError(err.message);
            setTasks([...tasks, { id: `temp-${Date.now()}`, ...newTask }]);
            console.error("Error adding task to API:", err);
            console.log('Tasks state after adding (temporary):', tasks);
        }
    };

    const handleEditTask = (taskToEdit) => {
        setEditingTask(taskToEdit);
    };

    const handleUpdateTask = async (updatedTask) => {
        try {
            const data = await api.updateTask(updatedTask.id, updatedTask);
            setTasks(tasks.map((task) => (task.id === data.id ? data : task)));
            setEditingTask(null);
        } catch (err) {
            setError(err.message);
            setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
            console.error("Error updating task to API:", err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await api.deleteTask(taskId);
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (err) {
            setError(err.message);
            setTasks(tasks.filter((task) => task.id !== taskId));
            console.error("Error deleting task from API:", err);
        }
    };

    const handleTaskClick = (task) => {
        alert(`Task "${task.title}" clicked! (ID: ${task.id})`);
    };

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newTasks = [...tasks];
        const movedTaskIndex = newTasks.findIndex((task) => task.id === draggableId);
        const [movedTask] = newTasks.splice(movedTaskIndex, 1);
        movedTask.status = destination.droppableId;
        newTasks.splice(destination.index, 0, movedTask);

        setTasks(newTasks);

        try {
            await api.updateTask(draggableId, { status: destination.droppableId });
        } catch (err) {
            setError(err.message);
            console.error("Error updating task status to API:", err);
        }
    };

    const handleSidebarItemClick = (itemLabel) => {
        setActiveSidebarItem(itemLabel);
        setActiveFilter(null);
        setFilterTag('');
        setSortBy('');
        setSearchTerm('');
    };

    const handleFilterByStatus = (status) => {
        setActiveFilter(status);
        setActiveSidebarItem(null);
        setFilterTag('');
        setSortBy('');
        setSearchTerm('');
    };

    const filteredAndSortedTasks = [...tasks]
        .filter(task =>
            (activeFilter === null || task.status === activeFilter) &&
            (filterTag === '' || (task.tags && task.tags.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase())))) &&
            (searchTerm === '' ||
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))))
        )
        .sort((a, b) => {
            if (sortBy === 'title-asc') {
                return a.title.localeCompare(b.title);
            } else if (sortBy === 'title-desc') {
                return b.title.localeCompare(a.title);
            } else if (sortBy === 'dueDate-asc') {
                const dateA = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31');
                const dateB = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
                return dateA - dateB;
            } else if (sortBy === 'dueDate-desc') {
                const dateA = a.dueDate ? new Date(a.dueDate) : new Date('1970-01-01');
                const dateB = b.dueDate ? new Date(b.dueDate) : new Date('1970-01-01');
                return dateB - dateA;
            }
            return 0;
        });
    console.log('filteredAndSortedTasks:', filteredAndSortedTasks);
    const toDoTasks = filteredAndSortedTasks.filter((task) => task.status === 'todo');
    const inProgressTasks = filteredAndSortedTasks.filter((task) => task.status === 'inprogress');
    const doneTasks = filteredAndSortedTasks.filter((task) => task.status === 'done');

    const renderContent = () => {
        switch (activeSidebarItem) {
            case 'Dashboard':
                return (
                    <>
                        <h2 className="text-2xl font-semibold mb-4">Task Board</h2>
                        <NewTaskForm onAddTask={handleAddTask} />

                        <div className="mb-4 flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <input
                                type="text"
                                placeholder="Filter by tag"
                                value={filterTag}
                                onChange={(e) => setFilterTag(e.target.value)}
                                className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Sort By</option>
                                <option value="title-asc">Title (A-Z)</option>
                                <option value="title-desc">Title (Z-A)</option>
                                <option value="dueDate-asc">Due Date (Earliest)</option>
                                <option value="dueDate-desc">Due Date (Latest)</option>
                            </select>
                        </div>

                        {editingTask && (
                            <>
                                {}
                                <h3>Edit Task</h3>
                                <label htmlFor="edit-title">Title:</label>
                                <input
                                    type="text"
                                    id="edit-title"
                                    value={editingTask.title || ''}
                                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 mb-2"
                                />
                                <label htmlFor="edit-description">Description:</label>
                                <textarea
                                    id="edit-description"
                                    value={editingTask.description || ''}
                                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 mb-2"
                                />
                                <label htmlFor="edit-tags">Tags (comma separated):</label>
                                <input
                                    type="text"
                                    id="edit-tags"
                                    placeholder="tags, separated by commas"
                                    value={editingTask.tags ? editingTask.tags.join(', ') : ''}
                                    onChange={(e) => setEditingTask({ ...editingTask, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '') })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 mb-2"
                                />
                                <label htmlFor="edit-dueDate">Due Date:</label>
                                <input
                                    type="date"
                                    id="edit-dueDate"
                                    value={editingTask.dueDate || ''}
                                    onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2 mb-2"
                                />
                                <button
                                    onClick={() => handleUpdateTask(editingTask)}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingTask(null)}
                                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancel
                                </button>
                            </>
                        )}

                        {loading ? (
                            <p>Loading tasks...</p>
                        ) : error ? (
                            <p className="text-red-500">Error loading tasks: {error}</p>
                        ) : (
                            <DragDropContext onDragEnd={onDragEnd}>
                                <div className="flex gap-4">
                                    <div className="w-80 min-h-[200px] rounded p-4" style={{ backgroundColor: '#f0f9ff' }}>
                                        <TaskColumn
                                            title="To Do"
                                            tasks={toDoTasks}
                                            onEditTask={handleEditTask}
                                            onDeleteTask={handleDeleteTask}
                                            onTaskClick={handleTaskClick}
                                        />
                                    </div>
                                    <div className="w-80 min-h-[200px] rounded p-4" style={{ backgroundColor: '#fef3c7' }}>
                                        <TaskColumn
                                            title="In Progress"
                                            tasks={inProgressTasks}
                                            onEditTask={handleEditTask}
                                            onDeleteTask={handleDeleteTask}
                                            onTaskClick={handleTaskClick}
                                        />
                                    </div>
                                    <div className="w-80 min-h-[200px] rounded p-4" style={{ backgroundColor: '#ecfdf5' }}>
                                        <TaskColumn
                                            title="Done"
                                            tasks={doneTasks}
                                            onEditTask={handleEditTask}
                                            onDeleteTask={handleDeleteTask}
                                            onTaskClick={handleTaskClick}
                                        />
                                    </div>
                                </div>
                            </DragDropContext>
                        )}
                    </>
                );
            case 'Projects':
                return <Projects />;
            case 'Settings':
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <div className="flex">
            <SideBar onItemClick={handleSidebarItemClick} onFilterByStatus={handleFilterByStatus} activeFilter={activeFilter} />
            <div className="flex-1 p-6">
                {renderContent()}
            </div>
        </div>
    );
};

export default App;