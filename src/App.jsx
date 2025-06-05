import React, { useState } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [editingDate, setEditingDate] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '' || newDescription.trim() === '' || newDate.trim() === '') return;
    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo, description: newDescription, date: newDate, completed: false },
    ]);
    setNewTodo('');
    setNewDescription('');
    setNewDate('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setEditingText(todo.text);
    setEditingDescription(todo.description);
    setEditingDate(todo.date);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: editingText, description: editingDescription, date: editingDate }
          : todo
      )
    );
    setEditingTodo(null);
    setEditingText('');
    setEditingDescription('');
    setEditingDate('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 overflow-hidden">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Todo List</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Task Title"
            className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Task Description"
            className="flex-1 p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={addTodo}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Add
          </button>
        </div>
        <ul className="space-y-4 overflow-y-auto max-h-96">
          {todos.map((todo) => (
            <li key={todo.id} className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="w-5 h-5 text-purple-500 focus:ring-purple-500"
                />
                {editingTodo === todo.id && !todo.completed ? (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="date"
                      value={editingDate}
                      onChange={(e) => setEditingDate(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ) : (
                  <span
                    className={`text-gray-800 ${
                      todo.completed ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    <strong>{todo.text}</strong> - {todo.description} (Due: {todo.date})
                  </span>
                )}
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                {editingTodo === todo.id ? (
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Save
                  </button>
                ) : (
                  !todo.completed && (
                    <button
                      onClick={() => startEditing(todo)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                  )
                )}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
