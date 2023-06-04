const express = require("express");
const { firestore } = require("./db");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Define the '/tasks' endpoint
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

// Define the '/createTask' endpoint
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

module.exports = router;
