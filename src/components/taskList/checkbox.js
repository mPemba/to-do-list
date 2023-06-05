import React, { useContext } from "react";
import styled from "styled-components";
import { colors } from "../../lib/colors";
import { TaskContext } from "../../lib/TaskContext";
import { updateTask } from "../../lib/service";

const Checkbox = ({ task }) => {
  const { tasks, setTasks, setShowBanner } = useContext(TaskContext);

  const handleCheckboxChange = async (task) => {
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

    // TODO update the task in the database after 3 seconds
    const response = await updateTask(task);

    if (response) {
      setShowBanner({
        show: true,
        message: "Task Updated Successfully",
        type: "success",
      });
    } else {
      setShowBanner({
        show: true,
        message: "Task Update Failed",
        type: "error",
      });
    }
  };

  return (
    <CheckboxContainer>
      {task.status === "completed" ? (
        <CustomCheckboxChecked onClick={() => handleCheckboxChange(task)}>
          <Check>✓</Check>
        </CustomCheckboxChecked>
      ) : (
        <CustomCheckbox
          onClick={() => handleCheckboxChange(task)}
        ></CustomCheckbox>
      )}
    </CheckboxContainer>
  );
};

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

export { Checkbox };
