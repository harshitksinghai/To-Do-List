import React from 'react';
import TodoList from './components/TodoList.tsx';
import './globals.css'

const App: React.FC = () => {
  return (
    <div className="App container mx-auto p-4">
      <TodoList />
    </div>
  );
};

export default App;
