import React, { useState } from 'react';
import {Button} from './ui/button';
import { Input } from './ui/input';

interface AddTodoProps {
  onAdd: (todo: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [todo, setTodo] = useState('');

  const handleAddTodo = () => {
    if (todo.trim()) {
      onAdd(todo.trim());
      setTodo('');
    } else {
      alert('Todo cannot be empty');
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <Input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new todo"
        className="border rounded p-2 flex-grow"
      />
      <Button onClick={handleAddTodo} className="bg-blue-500 text-white rounded px-4">
        Add Todo
      </Button>
    </div>
  );
};

export default AddTodo;
