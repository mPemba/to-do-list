const fetchTasks = async () => {
  try {
    const response = await fetch("http://localhost:5000/tasks");

    if (response.ok) {
      const tasksData = await response.json();
      return tasksData;
    } else {
      console.error("Failed to fetch tasks: ", response.status);
    }
  } catch (error) {
    console.error("Error fetching tasks: ", error);
  }
};

const createTask = async ({ title, description }) => {
  if (title) {
    try {
      const response = await fetch("http://localhost:5000/createTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          status: "active",
        }),
      });

      if (response.ok) {
        const taskData = await response.json();
        return taskData;
      } else {
        console.error("Failed to create task: ", response.status);
      }
    } catch (error) {
      console.error("Error creating task: ", error);
    }
  }
};

const updateTask = async ({ id, title, description, status }) => {
  try {
    const response = await fetch(`http://localhost:5000/updateTask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        status: status,
      }),
    });

    if (response.ok) {
      const taskData = await response.json();
      return taskData;
    } else {
      console.error("Failed to update task: ", response.status);
    }
  } catch (error) {
    console.error("Error updating task: ", error);
  }
};

export { fetchTasks, createTask, updateTask };
