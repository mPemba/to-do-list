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
          {
            id: "task1",
            data: () => ({
              title: "Task 1",
              description: "Task 1 Description",
              status: "active",
            }),
          },
          {
            id: "task2",
            data: () => ({
              title: "Task 2",
              description: "Task 2 Description",
              status: "active",
            }),
          },
        ],
      }),
      set: jest.fn(),
      doc: jest.fn().mockReturnThis(),
      update: jest.fn(),
      delete: jest.fn(),
    }),
  },
}));

describe("Tasks API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test the GET /api/tasks endpoint
  it("should get a list of tasks", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: "task1",
        title: "Task 1",
        description: "Task 1 Description",
        status: "active",
      },
      {
        id: "task2",
        title: "Task 2",
        description: "Task 2 Description",
        status: "active",
      },
    ]);
  });

  // Test the POST /api/createTask endpoint
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

  // Test the PUT /api/updateTask/:id endpoint
  it("should update a tasks status", async () => {
    const mockUUID = "task1";

    // Mock request body
    const taskData = {
      title: "Task 1",
      description: "Task 1 Description",
      status: "completed",
    };

    // Mock Timestamp
    const mockTimestamp = 1622707200;
    jest.spyOn(Date, "now").mockImplementation(() => mockTimestamp);

    // Make request
    const response = await request(app)
      .put(`/api/updateTask/${mockUUID}`)
      .send(taskData);

    // Verify response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      task: {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        updatedAt: mockTimestamp,
      },
    });
  });

  // Test the DELETE /api/deleteTask/:id endpoint
  it("should delete a task", async () => {
    const mockUUID = "task1";

    // Make request
    const response = await request(app).delete(`/api/deleteTask/${mockUUID}`);

    // Verify response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
    });
  });
});
