const express = require("express");
const { firestore } = require("./db");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Get all tasks
router.get("/tasks", (req, res) => {
  const tasksRef = firestore.collection("tasks");

  tasksRef
    .get()
    .then((snapshot) => {
      const tasks = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      res.status(200).json(tasks);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// Create a new task
router.post("/createTask", async (req, res) => {
  try {
    const { title, status, description } = req.body;

    // Generate a UUID for the task ID
    const id = uuidv4();

    // Get the current timestamp
    const timestamp = Date.now();

    // Create a new task object
    const task = {
      id,
      title,
      status,
      description,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    // Save the task to Firestore
    await firestore.collection("tasks").doc(id).set(task);

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ success: false, error: "Failed to create task" });
  }
});

// Update a task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Get the current timestamp
    const timestamp = Date.now();

    // Create a new task object
    const task = {
      title,
      description,
      status,
      updatedAt: timestamp,
    };

    // Save the task to Firestore
    await firestore.collection("tasks").doc(id).update(task);

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, error: "Failed to update task" });
  }
});

// Delete a task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the task from Firestore
    await firestore.collection("tasks").doc(id).delete();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, error: "Failed to delete task" });
  }
});

module.exports = router;
