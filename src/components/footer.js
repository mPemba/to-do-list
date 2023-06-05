import React, { useContext } from "react";
import styled from "styled-components";
import { TaskContext } from "../lib/TaskContext";
import { colors } from "../lib/colors";

const Footer = () => {
  const { showTaskForm, setShowTaskForm, showCompleted } =
    useContext(TaskContext);

  return (
    <FooterContainer showTaskForm={showTaskForm}>
      {!showTaskForm && !showCompleted && (
        <AddTask
          data-cy="create-new-task-button"
          onClick={() => setShowTaskForm(true)}
        >
          Add New Task +
        </AddTask>
      )}
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  width: ${(props) => (props.showTaskForm ? "0" : "100%")};
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 20px 20px 0px;
  position: fixed;
  bottom: 0;
`;

const AddTask = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 1rem;
  color: ${colors.white};
  background-color: ${colors.blue};
  padding: 10px 20px;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export { Footer };
