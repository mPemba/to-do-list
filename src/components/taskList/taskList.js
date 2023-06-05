import React, { useContext } from "react";
import styled from "styled-components";
import { TaskContext } from "../../lib/TaskContext";
import { NewTaskForm } from "./newTaskForm";
import { colors } from "../../lib/colors";
import { Checkbox } from "./checkbox";
import { TaskMenu } from "./taskMenu";
import { EditTaskForm } from "./editTaskForm";

const TaskList = () => {
  let tasksToDisplay = [];
  const { tasks, showTaskForm, showCompleted, editTask } =
    useContext(TaskContext);

  // filter the tasks based on the showCompleted state
  if (showCompleted === false) {
    tasksToDisplay = tasks.filter((task) => task.status === "active");
  } else {
    tasksToDisplay = tasks.filter((task) => task.status === "completed");
  }

  return (
    <TasksContainer>
      {/* TODO - style this message */}
      {tasksToDisplay.length === 0 && (
        <div>
          <h2>Nothing to do!</h2>
          <p>Click the button below to add a new task.</p>
        </div>
      )}
      <Tasks>
        {tasksToDisplay &&
          tasksToDisplay.map((task) => {
            if (editTask.show === true && editTask.task.id === task.id) {
              return <EditTaskForm key={task.id} taskToBeUpdated={task} />;
            } else {
              return (
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
              );
            }
          })}
        {showTaskForm && <NewTaskForm />}
      </Tasks>
    </TasksContainer>
  );
};

const TasksContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
`;

const Tasks = styled.div`
  width: 65%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 35px 0px 50px 0px;
  transition: width 0.8s ease-in-out;

  @media (max-width: 1024px) {
    width: 85%;
  }

  @media (max-width: 768px) {
    width: 95%;
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
  border-bottom: 1px solid ${colors.lightBlue};
  padding: 10px 0;
`;

const TaskDetails = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 3px;
  color: ${colors.darkBlue};
`;

const Description = styled.div`
  font-size: 1rem;
  color: ${colors.blue};
`;

export { TaskList };
