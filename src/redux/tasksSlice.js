// src/redux/tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [
    { id: 1, description: "Learn React", isDone: false },
    { id: 2, description: "Build a To-Do App", isDone: true },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const { id, description, isDone } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.description = description;
        task.isDone = isDone;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleTaskStatus: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTaskStatus } =
  tasksSlice.actions;
export default tasksSlice.reducer;
