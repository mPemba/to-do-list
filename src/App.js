import React, { useEffect, useState } from "react";
import styled from "styled-components";

function App() {
  const [tasks, setTasks] = useState([]);
  // get data from node server
  useEffect(() => {
    fetchTasks();
  }, []);

  // get tasks from server running on port 5000
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      if (response.ok) {
        const tasksData = await response.json();
        setTasks(tasksData);
      } else {
        console.error("Failed to fetch tasks: ", response.status);
      }
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  return (
    <Main>
      <Header>
        <h1>To Do List</h1>
        <Switcher>
          <div>Active</div>
          <div>Completed</div>
        </Switcher>
      </Header>

      <TasksContainer>
        <Tasks>
          {tasks.map((task) => (
            <Task key={task.id}>
              <Title>{task.title}</Title>
              <Description>{task.description}</Description>
            </Task>
          ))}
        </Tasks>
      </TasksContainer>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  height: 100vh;
`;

const Header = styled.div`
  width: 100%;
  height: 14%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
`;

const Switcher = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const TasksContainer = styled.div`
  width: 100%;
  height: 86%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Tasks = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: scroll;
  gap: 1rem;
  padding-top: 1rem;
`;

const Task = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Description = styled.div`
  font-size: 1rem;
`;

export default App;
