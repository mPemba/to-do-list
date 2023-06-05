import React, { useState, useContext } from "react";
import styled from "styled-components";
import { TaskContext } from "../../lib/TaskContext";
import { createTask } from "../../lib/service";
import { colors } from "../../lib/colors";
import Close from "../../lib/icons/close.svg";

const NewTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {
    tasks,
    setTasks,
    setShowTaskForm,
    errorState,
    setErrorState,
    setShowBanner,
  } = useContext(TaskContext);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const createNewTask = async () => {
    // if title is empty, show error state
    if (!title) {
      setErrorState(true);
      return;
    }

    // create the task
    const response = await createTask({ title, description });

    // if task is created successfully, update the state
    if (response) {
      const newTask = response.task;
      setErrorState(false);
      setTasks([...tasks, newTask]);
      setShowBanner({
        show: true,
        message: "Task Created Successfully",
        type: "success",
      });
    } else {
      setShowBanner({
        show: true,
        message: "Task Creation Failed",
        type: "error",
      });
    }

    // reset the form
    setTitle("");
    setDescription("");
    setShowTaskForm(false);
  };

  return (
    <NewTaskFormContainer>
      <FormHeader>
        <Heading>New Task</Heading>
        <IconContainer onClick={() => setShowTaskForm(false)}>
          <CloseIcon src={Close} alt="Close Form" />
        </IconContainer>
      </FormHeader>
      {errorState && <Error>Title is required</Error>}
      <div>Title</div>
      <TextInput
        type="text"
        label="Title"
        placeholder="Add a title"
        value={title}
        onChange={handleTitleChange}
        errorState={errorState}
      />
      <div>Description</div>
      <TextInput
        type="text"
        label="Description"
        placeholder="Add a description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <CreateButton onClick={() => createNewTask()}>Create Task</CreateButton>
    </NewTaskFormContainer>
  );
};

const NewTaskFormContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${colors.darkBlue};
  border: 2px solid ${colors.blue};
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  color: ${colors.white};
  gap: 0.5rem;
`;

const TextInput = styled.input`
  width: 100%;
  height: 40px;
  border: ${(props) =>
    props.errorState ? `2px solid ${colors.red}` : `2px solid ${colors.blue}`};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
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
  color: ${colors.white};
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

const CreateButton = styled.button`
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

const Error = styled.div`
  color: ${colors.red};
  font-size: 0.8rem;
  font-weight: 600;
`;

export { NewTaskForm };
