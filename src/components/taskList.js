import React from "react";
import styled from "styled-components";
import { TaskContext } from "../lib/TaskContext";
import { NewTaskForm } from "./newTaskForm";
import { colors } from "../lib/colors";

const TaskList = () => {
  const { tasks, showTaskForm } = React.useContext(TaskContext);
  return (
    <TasksContainer>
      <Tasks>
        {tasks &&
          tasks.map((task) => (
            <Task key={task.id}>
              <Title>{task.title}</Title>
              <Description>{task.description}</Description>
            </Task>
          ))}
        {showTaskForm && <NewTaskForm />}
      </Tasks>
    </TasksContainer>
  );
};

const TasksContainer = styled.div`
  width: 100%;
  height: 86%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Tasks = styled.div`
  width: 70%;
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
  background-color: ${colors.darkBlue};
  border: 2px solid ${colors.blue};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 6px 10px ${colors.lightGray};
`;

const Title = styled.div`
  font-weight: bold;
  color: ${colors.white};
  margin-bottom: 0.5rem;
`;

const Description = styled.div`
  font-size: 1rem;
  color: ${colors.lightBlue};
`;

export { TaskList };
