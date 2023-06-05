import React, { useContext } from "react";
import styled from "styled-components";
import { TaskContext } from "../../lib/TaskContext";
import { NewTaskForm } from "../newTaskForm";
import { colors } from "../../lib/colors";
import { Checkbox } from "./checkbox";
import { TaskMenu } from "./taskMenu";

const TaskList = () => {
  let tasksToDisplay = [];
  const { tasks, showTaskForm, showCompleted } = useContext(TaskContext);

  // filter the tasks based on the showCompleted state
  if (showCompleted === false) {
    tasksToDisplay = tasks.filter((task) => task.status === "active");
  } else {
    tasksToDisplay = tasks.filter((task) => task.status === "completed");
  }

  return (
    <TasksContainer>
      <Tasks>
        {tasksToDisplay &&
          tasksToDisplay.map((task) => (
            <Task key={task.id}>
              <Checkbox task={task} />
              <TaskDetails>
                <Title>{task.title}</Title>
                {task.description && task.description !== "" && (
                  <Description>{task.description}</Description>
                )}
              </TaskDetails>
              <TaskMenu task={task} />
            </Task>
          ))}
        {showTaskForm && <NewTaskForm />}
      </Tasks>
    </TasksContainer>
  );
};

const TasksContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
`;

const Tasks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 2rem 0;
  transition: width 0.8s ease-in-out;

  @media (max-width: 1024px) {
    width: 70%;
  }

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 425px) {
    width: 100%;
  }
`;

const Task = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${colors.darkBlue};
  border: 2px solid ${colors.blue};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 6px 10px ${colors.lightGray};
`;

const TaskDetails = styled.div`
  width: 100%;
  height: 84%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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
