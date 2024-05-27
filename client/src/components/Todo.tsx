import React from 'react';
import { Todo as TodoType } from '@/types.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface TodoProps {
  todo: TodoType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const handleToggle = () => onToggle(todo.id);
  const handleDelete = () => onDelete(todo.id);
  const handleEdit = () => {
    const newText = prompt('Edit todo', todo.text);
    if (newText) onEdit(todo.id, newText);
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      <span className={`flex-grow ${todo.completed ? 'line-through' : ''}`}>{todo.text}</span>
      <button onClick={handleEdit} className="text-blue-500">
        <EditIcon />
      </button>
      <button onClick={handleDelete} className="text-red-500">
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Todo;
