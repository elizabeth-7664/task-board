
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task, index, onEdit, onDelete, onClick }) => (
    <Draggable draggableId={task.id} index={index}>
        {(provided) => (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 p-3 mb-2 rounded shadow-sm cursor-grab text-gray-800 dark:text-gray-100"
                onClick={() => onClick(task)}
            >
                <div className="flex justify-between items-center mb-1">
                    <span>{task.title}</span>
                    <div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(task);
                            }}
                            className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(task.id);
                            }}
                            className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                {task.tags && task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-block bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full px-2 py-1"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                {}
            </div>
        )}
    </Draggable>
);

export default TaskCard;