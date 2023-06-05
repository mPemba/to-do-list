import React, { useContext } from "react";
import styled from "styled-components";
import { TaskContext } from "../lib/TaskContext";
import { NewTaskForm } from "./newTaskForm";
import { colors } from "../lib/colors";
import { updateTask } from "../lib/service";
import MenuIcon from "../lib/icons/menu-vertical.svg";

const TaskList = () => {
  let tasksToDisplay = [];
  const { tasks, showTaskForm, setTasks, showCompleted } =
    useContext(TaskContext);

  const handleCheckboxChange = async (task) => {
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
    const response = await updateTask(task);
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
                {task.description && task.description !== "" && (
                  <Description>{task.description}</Description>
                )}
              </TaskDetails>
              <MenuContainer>
                <Icon src={MenuIcon} alt="Menu" />
              </MenuContainer>
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
  overflow-y: scroll;
`;

// animate width on width change
const Tasks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 1rem;
  padding-top: 2rem;
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
  height: 100%;
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

const MenuContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export { TaskList };
