import React, { useEffect, useState } from "react";
import styled from "styled-components";

function App() {
  const [tasks, setTasks] = useState([]);
  const [addTaskForm, setAddTaskForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorState, setErrorState] = useState(false);

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

  const createTask = async () => {
    !title && setErrorState(true);

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
          setTasks([...tasks, taskData.task]);
          clearForm();
        } else {
          console.error("Failed to create task: ", response.status);
        }
      } catch (error) {
        console.error("Error creating task: ", error);
      }
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setAddTaskForm(false);
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
          {addTaskForm && (
            <NewTaskFormContainer>
              <span onClick={() => setAddTaskForm(false)}>close</span>
              <TextInput
                type="text"
                label="Title"
                placeholder="Add a title"
                value={title}
                onChange={handleTitleChange}
                errorState={errorState}
              />
              <TextInput
                type="text"
                label="Description"
                placeholder="Add a description"
                value={description}
                onChange={handleDescriptionChange}
                errorState={errorState}
              />
              {errorState && <div>Title is required</div>}
              {title && (
                <button onClick={() => createTask()}>Create Task</button>
              )}
            </NewTaskFormContainer>
          )}
        </Tasks>
      </TasksContainer>

      <Footer>
        <FooterContent>
          {tasks.length} Task{tasks.length !== 1 && "s"}
        </FooterContent>
        <FooterContent onClick={() => setAddTaskForm(true)}>
          Add New Task +
        </FooterContent>
      </Footer>
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

const NewTaskFormContainer = styled(Task)`
  height: fit-content;
  gap: 0.5rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Description = styled.div`
  font-size: 1rem;
`;

const TextInput = styled.input`
  width: 100%;
  height: 2rem;
  border: ${(props) =>
    props.errorState ? "1px solid red" : "1px solid #bdbdbd"}};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

// make sure footer stays on bottom of page
const Footer = styled.div`
  width: 100%;
  height: 100px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e0e0e0;
  padding: 0 2rem;
  position: fixed;
  bottom: 0;
`;

const FooterContent = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 1rem;
  color: #757575;
  cursor: pointer;
`;

export default App;
