// src/components/Task.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskStatus, editTask } from "../redux/tasksSlice";
import { FaEdit, FaTrash } from "react-icons/fa";

const Task = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (isEditing) {
      dispatch(
        editTask({
          id: task.id,
          description: editedDescription,
          isDone: task.isDone,
        })
      );
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`task ${task.isDone ? "completed" : ""}`}>
      {isEditing ? (
        <input
          type="text"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
      ) : (
        <span>{task.description}</span>
      )}
      <div>
        <button onClick={() => dispatch(toggleTaskStatus(task.id))}>
          {task.isDone ? "Undo" : "Done"}
        </button>
        <button onClick={handleEdit}>
          <FaEdit />
        </button>
        <button onClick={() => dispatch(deleteTask(task.id))}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Task;
