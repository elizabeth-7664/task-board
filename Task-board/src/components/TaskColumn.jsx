// taskcolumn.jsx
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onEditTask, onDeleteTask, onTaskClick }) => (
    <Droppable droppableId={title.toLowerCase().replace(' ', '')}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 dark:bg-gray-800 p-4 w-80 min-h-[200px] rounded"
            >
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">{title}</h3>
                {tasks.map((task, index) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        index={index}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                        onClick={onTaskClick}
                    />
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);

export default TaskColumn;