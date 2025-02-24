import React, { useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [editingTask, setEditingTask] = useState(null);

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now(), completed: false };
    saveTasks([...tasks, newTask]);
  };

  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(updatedTasks);
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      saveTasks(updatedTasks);
    }
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <TaskForm
        onSubmit={editingTask ? editTask : addTask}
        initialTask={editingTask}
      />
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={setEditingTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
