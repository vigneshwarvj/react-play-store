import React, { useState } from 'react';
import '../Todo/Todo.css';
import Header from '../../Header';

function Todo(){
    const [input, setInput] = useState('');
    const [inputDesc, setInputDesc] = useState('');
    const [category, setCategory] = useState('personal');
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [alert, setAlert] = useState(null);

    function showAlert(message){
        setAlert(message);
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    const handleAddTask = (task) => {
        setTodos([...todos, { id: Date.now(), ...task, completed: false }]);
        showAlert('Task added successfully!');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) {
            return;
        }
        setTodos([...todos, { id: Date.now(), text: input, description: inputDesc, category, completed: false }]);
        setInput('');
        setInputDesc('');
        setCategory('personal');
        showAlert('Task added successfully!');
    };

    const handleToggle = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        showAlert('Task deleted successfully!');
    };

    const handleEdit = (id) => {
        setEditingTaskId(id);
        const taskToEdit = todos.find((todo) => todo.id === id);
        setInput(taskToEdit.text);
        setInputDesc(taskToEdit.description);
        setCategory(taskToEdit.category);
    };

    const handleSave = () => {
        if (editingTaskId === null) {
            return;
        }

        const updatedTodos = todos.map((todo) =>
            todo.id === editingTaskId
                ? { ...todo, text: input, description: inputDesc, category, editing: false }
                : todo
        );
        setTodos(updatedTodos);
        setEditingTaskId(null);
        setInput('');
        setInputDesc('');
        setCategory('personal');
        showAlert('Task updated successfully!');
    };

    const handleFilter = (e) => {
        setFilter(e.target.value);
    };

    const filteredTodos =
        filter === 'all'
            ? todos
            : filter === 'completed'
            ? todos.filter((todo) => todo.completed)
            : todos.filter((todo) => !todo.completed);

    return (
        <>
        <Header/>
        <div className="todo">
            {alert && <div className="alert">{alert}</div>}
            <h1>#to do your works</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Task Title:
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </label>
                <label>
                    Task Description:
                    <input
                        type="text"
                        value={inputDesc}
                        onChange={(e) => setInputDesc(e.target.value)}
                    />
                </label>
                <label>
                    Category:
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                {editingTaskId !== null ? (
                    <button type="button" onClick={handleSave}>
                        Save
                    </button>
                ) : (
                    <button type="submit">+Add Task</button>
                )}
            </form>
            <footer>
                <span>Filter: </span>
                <select value={filter} onChange={handleFilter}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incompleted">Incompleted</option>
                </select>
                <span>Total Tasks: {todos.length}</span>
            </footer>
            <ul>
                {filteredTodos.map((todo) => (
                    <li
                        key={todo.id}
                        onClick={() => handleToggle(todo.id)}
                        className={todo.completed ? 'completed' : 'incompleted'}
                    >
                        <div className="task-details">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggle(todo.id)}
                            className={`tick-button${todo.completed ? ' ticked' : ''}`}
                        />
                            {/* <button
                                className={`tick-button${todo.completed ? ' ticked' : ''}`}
                                onClick={(e) => {
                                   // e.stopPropagation();
                                    handleToggle(todo.id);
                                }}
                            >
                            </button> */}
                            <p>
                                {todo.category === 'personal' && '🏠 '}
                                {todo.category === 'work' && '💼 '}
                                {todo.category === 'other' && '🚀 '}
                                <strong>{todo.text}</strong>
                            </p>
                            <p>{todo.description}</p>
                            <span className="buttons">
                                
                                <button className="edit" onClick={() => handleEdit(todo.id)}>
                                    Edit
                                </button>
                                <button className="delete" onClick={() => handleDelete(todo.id)}>
                                    Delete
                                </button>
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default Todo;
