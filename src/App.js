import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { TaskContext } from "./lib/TaskContext";
import { Footer } from "./components/footer";
import { fetchTasks } from "./lib/service";
import { Header } from "./components/header";
import { TaskList } from "./components/taskList/taskList";
import { Banner } from "./components/banner";

function App() {
  const { setTasks, showBanner, setShowBanner } = useContext(TaskContext);

  // get data from node server
  useEffect(() => {
    const getTasks = async () => {
      const response = await fetchTasks();
      if (response) {
        setTasks(response);
      } else {
        setShowBanner({
          show: true,
          message: "Error Fetching Tasks - Please Try Again",
          type: "error",
        });
      }
    };
    getTasks();
  }, [setTasks, setShowBanner]);

  return (
    <Main>
      {showBanner.show && <Banner />}
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
