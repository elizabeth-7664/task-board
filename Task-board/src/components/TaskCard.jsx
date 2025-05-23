import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { isPast, isWithinInterval, parseISO } from 'date-fns'; 

const TaskCard = ({ task, index, onEdit, onDelete, onClick }) => {
    let statusColor = '';

    switch (task.status) {
        case 'toDo':
            statusColor = 'bg-blue-500';
            break;
        case 'inprogress':
            statusColor = 'bg-yellow-500';
            break;
        case 'done':
            statusColor = 'bg-green-500';
            break;
        default:
            statusColor = 'bg-gray-500'; 
    }

    let dueDateStyle = 'text-gray-600 dark:text-gray-300 text-sm mt-1'; 

    if (task.dueDate) {
        const dueDate = parseISO(task.dueDate);
        const now = new Date();
        const twoDaysFromNow = new Date();
        twoDaysFromNow.setDate(now.getDate() + 2);

        if (isPast(dueDate)) {
            dueDateStyle = 'text-red-600 dark:text-red-300 text-sm mt-1 font-bold'; 
        } else if (isWithinInterval(dueDate, { start: now, end: twoDaysFromNow })) {
            dueDateStyle = 'text-orange-600 dark:text-orange-300 text-sm mt-1 font-bold'; 
        }
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 p-3 mb-2 rounded shadow-sm cursor-grab text-gray-800 dark:text-gray-100 flex`}
                    onClick={() => onClick(task)}
                >
                    <div className="w-2 mr-3" style={{ backgroundColor: statusColor }}></div> {}
                    <div className="flex-1">
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
                            <div className="flex flex-wrap gap-1 mb-1">
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
                        {task.dueDate && (
                            <p className={dueDateStyle}>
                                Due: {task.dueDate}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;