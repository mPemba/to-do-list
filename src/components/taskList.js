import React, { useContext } from "react";
import styled from "styled-components";
import { TaskContext } from "../lib/TaskContext";
import { NewTaskForm } from "./newTaskForm";
import { colors } from "../lib/colors";
import { updateTask } from "../lib/service";

const TaskList = () => {
  let tasksToDisplay = [];
  const { tasks, showTaskForm, setTasks, showCompleted } =
    useContext(TaskContext);

  const handleCheckboxChange = (task) => {
    console.log(task);

    // update the task status
    if (task.status === "active") {
      task.status = "completed";
    } else {
      task.status = "active";
    }

    // update the task in state
    setTasks(
      tasks.map((item) => {
        if (item.id === task.id) {
          return {
            ...item,
            status: task.status,
          };
        }
        return item;
      })
    );

    // update the task in the database
    const response = updateTask(task);
    console.log(response);
  };

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
              <CheckboxContainer>
                {task.status === "completed" ? (
                  <CustomCheckboxChecked
                    onClick={() => handleCheckboxChange(task)}
                  >
                    <Check>✓</Check>
                  </CustomCheckboxChecked>
                ) : (
                  <CustomCheckbox
                    onClick={() => handleCheckboxChange(task)}
                  ></CustomCheckbox>
                )}
              </CheckboxContainer>
              <TaskDetails>
                <Title>{task.title}</Title>
                <Description>{task.description}</Description>
              </TaskDetails>
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
  height: 100%;
  display: flex;
  flex-direction: column;
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

const CheckboxContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const CustomCheckbox = styled.div`
  width: 25px;
  height: 25px;
  border: 2px solid ${colors.white};
  background-color: ${colors.darkBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CustomCheckboxChecked = styled(CustomCheckbox)`
  background-color: ${colors.blue};
  border: 2px solid ${colors.white};
`;

const Check = styled.span`
  color: ${colors.white};
  font-size: 1rem;
`;

export { TaskList };
