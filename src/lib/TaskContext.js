import React, { createContext, useState } from "react";

// Create the TaskContext
export const TaskContext = createContext();

// Create the TaskProvider component
export const TaskProvider = ({ children }) => {
  // Define the state for tasks
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [editTask, setEditTask] = useState({
    show: false,
    task: {},
  });
  const [showBanner, setShowBanner] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Make the context object
  const contextValue = {
    tasks,
    setTasks,
    showTaskForm,
    setShowTaskForm,
    errorState,
    setErrorState,
    showCompleted,
    setShowCompleted,
    showBanner,
    setShowBanner,
    editTask,
    setEditTask,
  };

  // Return the TaskProvider component with the context value
  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
