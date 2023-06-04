import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <h1>To Do List</h1>
      <Switcher>
        <div>Active</div>
        <div>Completed</div>
      </Switcher>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 14%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
`;

const Switcher = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export { Header };
