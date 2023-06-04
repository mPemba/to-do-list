import React, { useEffect } from "react";
import styled from "styled-components";
import { TaskContext } from "./lib/TaskContext";
import { Footer } from "./components/footer";
import { fetchTasks } from "./lib/service";
import { Header } from "./components/header";
import { TaskList } from "./components/taskList";

function App() {
  const { setTasks } = React.useContext(TaskContext);

  // get data from node server
  useEffect(() => {
    const getTasks = async () => {
      const response = await fetchTasks();
      setTasks(response);
    };
    getTasks();
  }, [setTasks]);

  return (
    <Main>
      <Header />
      <TaskList />
      <Footer />
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  height: 100vh;
`;

export default App;
