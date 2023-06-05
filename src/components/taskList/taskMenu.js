import React, { useState, useContext } from "react";
import styled from "styled-components";
import { colors } from "../../lib/colors";
import { TaskContext } from "../../lib/TaskContext";
import { deleteTask } from "../../lib/service";
import MenuIcon from "../../lib/icons/menu-vertical.svg";

const TaskMenu = ({ task }) => {
  const { tasks, setTasks, setShowBanner } = useContext(TaskContext);

  const [showMenu, setShowMenu] = useState({
    show: false,
    id: null,
  });

  const toggleMenu = (id) => {
    if (showMenu.show === true && showMenu.id === id) {
      setShowMenu({ show: false, id: null });
    } else {
      setShowMenu({ show: true, id: id });
    }
  };

  const deleteItem = async (id) => {
    const response = await deleteTask({ id });
    if (response) {
      setTasks(tasks.filter((task) => task.id !== id));
      setShowBanner({
        show: true,
        message: "Task Deleted Successfully",
        type: "success",
      });
    }
  };

  return (
    <MenuContainer>
      {!showMenu.show && (
        <Icon src={MenuIcon} alt="Menu" onClick={() => toggleMenu(task.id)} />
      )}
      {showMenu.show && showMenu.id === task.id && (
        <Menu>
          <Delete onClick={() => deleteItem(task.id)}>delete</Delete>
          <Edit>edit</Edit>
          <Item onClick={() => toggleMenu(task.id)}>cancel</Item>
        </Menu>
      )}
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  width: fit-content;
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

const Menu = styled.div`
  width: fit-content;
  height: fit-content;
  transition: width 1s ease-in-out;
  display: flex;
  gap: 20px;
`;

const Item = styled.span`
  width: fit-content;
  transition: width 1s ease-in-out;
  height: fit-content;
  cursor: pointer;
  color: ${colors.gray};
`;

const Delete = styled(Item)`
  color: ${colors.red};
`;

const Edit = styled(Item)`
  color: ${colors.blue};
`;

export { TaskMenu };
