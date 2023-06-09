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
  if (tasks && tasks.length > 0) {
    if (showCompleted === false) {
      tasksToDisplay = tasks.filter((task) => task.status === "active");
    } else {
      tasksToDisplay = tasks.filter((task) => task.status === "completed");
    }
  }

  return (
    <TasksContainer>
      {tasksToDisplay.length === 0 && showCompleted === false && (
        <EmptyState>
          <h2>Nothing to do!</h2>
          <p>Click the button below to add a new task.</p>
        </EmptyState>
      )}
      <Tasks>
        {tasksToDisplay &&
          tasksToDisplay.map((task, index) => {
            if (editTask.show === true && editTask.task.id === task.id) {
              return (
                <EditTaskForm
                  key={task.id}
                  taskToBeUpdated={task}
                  index={index}
                />
              );
            } else {
              return (
                <Task data-cy={`task-container-${index}`} key={task.id}>
                  <Checkbox task={task} index={index} />
                  <TaskDetails>
                    <Title data-cy={`task-title-${index}`}>{task.title}</Title>
                    {task.description && task.description !== "" && (
                      <Description data-cy={`task-description-${index}`}>
                        {task.description}
                      </Description>
                    )}
                    {task.createdAt && (
                      <CreatedAt>
                        {new Date(task.createdAt).toLocaleDateString()}
                      </CreatedAt>
                    )}
                  </TaskDetails>
                  <TaskMenu task={task} index={index} />
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

const EmptyState = styled.div`
  width: 65%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 35px 0px 50px 0px;
  transition: width 0.8s ease-in-out;
  color: ${colors.darkBlue};
  gap: 1rem;
`;

const CreatedAt = styled.span`
  font-size: 12px;
  color: ${colors.blue};
  margin-top: 3px;
`;

export { TaskList };
