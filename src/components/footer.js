import React from "react";
import styled from "styled-components";
import { TaskContext } from "../lib/TaskContext";
import { colors } from "../lib/colors";

const Footer = () => {
  const { tasks, setAddTaskForm } = React.useContext(TaskContext);

  return (
    <FooterContainer>
      <FooterContent>
        {tasks.length} Task{tasks.length !== 1 && "s"}
      </FooterContent>
      <FooterContent onClick={() => setAddTaskForm(true)}>
        Add New Task +
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${colors.darkBlue};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid ${colors.blue};
  padding: 0 2rem;
  position: fixed;
  bottom: 0;
`;

const FooterContent = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 1rem;
  color: ${colors.white};
  cursor: pointer;
`;

export { Footer };
