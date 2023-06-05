import React, { useContext } from "react";
import styled from "styled-components";
import { colors } from "../lib/colors";
import { TaskContext } from "../lib/TaskContext";

const Header = () => {
  const { tasks, showCompleted, setShowCompleted, setShowTaskForm } =
    useContext(TaskContext);

  const handleClick = (show) => {
    setShowCompleted(show);
    setShowTaskForm(false);
  };

  return (
    <HeaderContainer>
      <span>
        <Heading>To Do List</Heading>
        {tasks.length > 0 && (
          <Count>
            {tasks.length} Task{tasks.length !== 1 && "s"}
          </Count>
        )}
      </span>
      <Switcher>
        <DisplaySwitch
          highlight={showCompleted === false ? true : false}
          onClick={() => handleClick(false)}
        >
          Active
        </DisplaySwitch>
        <DisplaySwitch
          highlight={showCompleted === true ? true : false}
          onClick={() => handleClick(true)}
        >
          Completed
        </DisplaySwitch>
      </Switcher>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: fit-content;
  background-color: ${colors.darkBlue};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 2px solid ${colors.blue};
`;

const Heading = styled.h1`
  color: ${colors.white};
`;

const Switcher = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  gap: 1rem;
  color: ${colors.white};
`;

const DisplaySwitch = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 1rem;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.highlight ? `2px solid ${colors.white}` : "none"};
`;

const Count = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 14px;
  color: ${colors.white};
`;

export { Header };
