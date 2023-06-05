import React, { useContext, useState } from "react";
import styled from "styled-components";
import { colors } from "../../lib/colors";
import { TaskContext } from "../../lib/TaskContext";
import { updateTask } from "../../lib/service";

const Checkbox = ({ task, index }) => {
  const { tasks, setTasks, setShowBanner } = useContext(TaskContext);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = async (task) => {
    // set loading to true
    setLoading(true);

    // update the task status
    if (task.status === "active") {
      task.status = "completed";
    } else {
      task.status = "active";
    }

    setTimeout(async () => {
      const response = await updateTask(task);

      if (response) {
        setShowBanner({
          show: true,
          message: "Task Updated Successfully",
          type: "success",
        });

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
      } else {
        setShowBanner({
          show: true,
          message: "Task Update Failed",
          type: "error",
        });
      }

      // set loading to false
      setLoading(false);
    }, 1000);
  };

  return (
    <CheckboxContainer data-cy={`task-checkbox-${index}`}>
      {loading && (
        <LoadingSpinner data-cy="task-checkbox-loading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </LoadingSpinner>
      )}
      {task.status === "completed" ? (
        <CustomCheckboxChecked
          loading={loading}
          onClick={() => handleCheckboxChange(task)}
        >
          <Check data-cy="task-checkbox-completed-check">✓</Check>
        </CustomCheckboxChecked>
      ) : (
        <CustomCheckbox
          loading={loading}
          onClick={() => handleCheckboxChange(task)}
        ></CustomCheckbox>
      )}
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.div`
  width: 50px;
  height: 20px;
  display: ${(props) => (props.loading ? "none" : "flex")};
  align-items: center;
  justify-content: center;
`;

const CustomCheckbox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${colors.darkBlue};
  background-color: ${colors.white};
  display: ${(props) => (props.loading ? "none" : "flex")};
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
  font-size: 12px;
`;

const LoadingSpinner = styled.span`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid ${colors.blue};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${colors.blue} transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export { Checkbox };
