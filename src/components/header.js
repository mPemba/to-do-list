import React, { useContext } from "react";
import styled from "styled-components";
import { colors } from "../lib/colors";
import { TaskContext } from "../lib/TaskContext";

const Header = () => {
  const { showCompleted, setShowCompleted, setShowTaskForm } =
    useContext(TaskContext);

  const handleClick = (show) => {
    setShowCompleted(show);
    setShowTaskForm(false);
  };

  return (
    <HeaderContainer>
      <Heading>To Do List</Heading>
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
  height: 100px;
  background-color: ${colors.darkBlue};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  margin-top: 1rem;
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

export { Header };
