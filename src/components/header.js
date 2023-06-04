import React from "react";
import styled from "styled-components";
import { colors } from "../lib/colors";

const Header = () => {
  return (
    <HeaderContainer>
      <Heading>To Do List</Heading>
      <Switcher>
        <div>Active</div>
        <div>Completed</div>
      </Switcher>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 11%;
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

export { Header };
