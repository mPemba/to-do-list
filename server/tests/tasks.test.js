const request = require("supertest");
const express = require("express");
const tasksRouter = require("../src/tasks");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.use("/api", tasksRouter);

jest.mock("uuid");

// Mock the tasks data
jest.mock("../src/db.js", () => ({
  firestore: {
    collection: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({
        docs: [
          { id: "task1", data: () => ({ title: "Task 1" }) },
          { id: "task2", data: () => ({ title: "Task 2" }) },
        ],
      }),
      set: jest.fn(),
      doc: jest.fn().mockReturnThis(),
    }),
  },
}));

describe("Tasks API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get a list of tasks", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: "task1", title: "Task 1" },
      { id: "task2", title: "Task 2" },
    ]);
  });

  it("should create a new task", async () => {
    // Mock request body
    const taskData = {
      title: "Task Title",
      description: "Task Description",
      status: "active",
    };

    // Mock UUID and Firestore Timestamp
    const mockUUID = "mock-uuid";
    const mockTimestamp = 1622707200;
    jest.spyOn(Date, "now").mockImplementation(() => mockTimestamp);

    // Mock UUID
    uuidv4.mockReturnValue(mockUUID);

    // Make request
    const response = await request(app).post("/api/createTask").send(taskData);

    // Verify response
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      task: {
        id: mockUUID,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        createdAt: mockTimestamp,
        updatedAt: mockTimestamp,
      },
    });
  });
});
