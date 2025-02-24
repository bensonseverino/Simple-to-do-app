import React, { useState } from "react";

const TaskForm = ({ onSubmit, initialTask }) => {
  const [taskName, setTaskName] = useState(initialTask?.name || "");
  const [taskDescription, setTaskDescription] = useState(
    initialTask?.description || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !taskDescription.trim()) {
      alert("Task name and description are required!");
      return;
    }
    onSubmit({ name: taskName, description: taskDescription });
    setTaskName("");
    setTaskDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <button type="submit">{initialTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
