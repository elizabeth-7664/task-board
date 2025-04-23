import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function TaskColumn({ title, tasks, status, onEdit, onDelete }) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="flex flex-col bg-gray-100 rounded-xl p-4 shadow-md w-full max-w-xs min-h-[400px]">
      <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
      <div
        ref={setNodeRef}
        className="flex-1 space-y-3 overflow-y-auto"
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
          />
        ))}
      </div>
    </div>
  );
}
