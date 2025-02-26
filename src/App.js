import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  const updateTask = () => {
    if (editedTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex].text = editedTask;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditedTask("");
    }
  };

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            {editingIndex === index ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={updateTask}>✔</button>
              </div>
            ) : (
              <>
                <span onClick={() => toggleTask(index)}>{task.text}</span>
                <div>
                  <button className="edit-btn" onClick={() => startEditing(index)}>✏</button>
                  <button className="delete-btn" onClick={() => deleteTask(index)}>❌</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
