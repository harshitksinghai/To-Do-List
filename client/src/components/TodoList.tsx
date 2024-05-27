import React, { useEffect, useState } from 'react';
import { Todo as TodoType } from '@/types.ts';
import AddTodo from './AddTodo.tsx';
import Todo from './Todo.tsx';
import { v4 as uuidv4 } from 'uuid';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(savedTodos);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: TodoType = { id: uuidv4(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
  };

  const sortTodos = (todos: TodoType[]) => {
    return todos.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.text.localeCompare(b.text);
      } else {
        return b.text.localeCompare(a.text);
      }
    });
  };

  const filterTodos = (todos: TodoType[], filter: string) => {
    return todos.filter(todo => todo.text.toLowerCase().includes(filter.toLowerCase()));
  };

  const displayedTodos = sortTodos(filterTodos(todos, filter));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Todo List</h1>
      <div className="max-w-md mx-auto bg-gray-100 rounded-md p-4 mb-4">
        <AddTodo onAdd={addTodo} />
        <div className="mb-4">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter todos"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="border rounded p-2 w-full"
          >
            <option value="asc">Sort Ascending</option>
            <option value="desc">Sort Descending</option>
          </select>
        </div>
        <div className="space-y-4">
          {displayedTodos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
