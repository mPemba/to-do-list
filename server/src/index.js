const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const tasksRouter = require("./tasks");

// Enable CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Enable JSON body parsing
app.use(express.json());

// Use tasks router
app.use(tasksRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
