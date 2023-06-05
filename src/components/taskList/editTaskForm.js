import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { TaskContext } from "../../lib/TaskContext";
import { colors } from "../../lib/colors";
import Close from "../../lib/icons/close.svg";
import { updateTask } from "../../lib/service";

const EditTaskForm = ({ taskToBeUpdated }) => {
  const {
    errorState,
    setErrorState,
    setEditTask,
    setShowBanner,
    tasks,
    setTasks,
  } = useContext(TaskContext);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    setNewTitle(taskToBeUpdated.title);
    setNewDescription(taskToBeUpdated.description);
  }, [taskToBeUpdated]);

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };

  const updateCurrentTask = async () => {
    // if title is empty, show error state
    if (!newTitle) {
      setErrorState(true);
      return;
    } else {
      setErrorState(false);
    }

    const response = await updateTask({
      id: taskToBeUpdated.id,
      title: newTitle,
      description: newDescription,
      status: taskToBeUpdated.status,
    });

    if (response) {
      setTasks([
        ...tasks.map((item) => {
          if (item.id === taskToBeUpdated.id) {
            return {
              ...item,
              title: newTitle,
              description: newDescription,
            };
          }
          return item;
        }),
      ]);
      setEditTask({
        show: false,
        task: {},
      });
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
    <EditMenuContainer key={taskToBeUpdated.id}>
      <FormHeader>
        <Heading>Edit Task</Heading>
        <IconContainer
          onClick={() =>
            setEditTask({
              show: false,
              task: {},
            })
          }
        >
          <CloseIcon src={Close} alt="Close Form" />
        </IconContainer>
      </FormHeader>
      <Details>
        <div>Title</div>
        <TextInput
          type="text"
          label="Title"
          value={newTitle}
          onChange={handleTitleChange}
          errorState={errorState}
        />
        {taskToBeUpdated.description && taskToBeUpdated.description !== "" && (
          <>
            <div>Description</div>
            <TextInput
              type="text"
              label="Description"
              value={newDescription}
              onChange={handleDescriptionChange}
              errorState={errorState}
            />
          </>
        )}
      </Details>
      <UpdateButton onClick={() => updateCurrentTask()}>
        Update Task
      </UpdateButton>
    </EditMenuContainer>
  );
};

const EditMenuContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${colors.lightBlue};
  padding: 40px;
`;

const FormHeader = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const Heading = styled.div`
  color: ${colors.darkBlue};
  font-weight: 600;
`;

const IconContainer = styled.div`
  width: fit-content;
  height: fit-content;
  cursor: pointer;
`;

const CloseIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Details = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const TextInput = styled.input`
  width: 100%;
  height: fit-content;
  border: none;
  border-bottom: ${(props) =>
    props.errorState
      ? `2px solid ${colors.red}`
      : `1px solid ${colors.lightBlue}`};
  background: none;
  outline: none;
  color: ${colors.darkBlue};
  font-size: 1rem;
  padding: 10px 0;
  margin-bottom: 20px;
`;

const UpdateButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 0.5rem;
  background-color: ${colors.blue};
  color: ${colors.white};
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background-color: ${colors.green};
  }
`;

export { EditTaskForm };
