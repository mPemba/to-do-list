// Server for To-Do List App
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const serviceAccount = require("./secret/to-do-list-c4cf0-firebase-adminsdk-8c2gk-253309cdae.json");
const app = express();
const port = process.env.PORT || 5000;

// Enable CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const firestore = admin.firestore();

// Get all tasks
app.get("/tasks", (req, res) => {
  console.log("getting tasks");
  const tasksRef = firestore.collection("tasks");

  tasksRef
    .get()
    .then((snapshot) => {
      const tasks = [];
      snapshot.forEach((doc) => {
        tasks.push(doc.data());
      });
      console.log({ tasks });
      res.json(tasks);
    })
    .catch((error) => {
      console.error("Error getting tasks: ", error);
      res.status(500).send("Error getting tasks.");
    });
});
