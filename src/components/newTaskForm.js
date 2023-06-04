import React, { useState, useContext } from "react";
import styled from "styled-components";
import { TaskContext } from "../lib/TaskContext";
import { createTask } from "../lib/service";
import { colors } from "../lib/colors";

const NewTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { tasks, setTasks, setShowTaskForm, errorState } =
    useContext(TaskContext);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const createNewTask = async () => {
    const response = createTask(title, description);
    setTasks([...tasks, response]);
    setTitle("");
    setDescription("");
    setShowTaskForm(false);
  };

  return (
    <NewTaskFormContainer>
      <span onClick={() => setShowTaskForm(false)}>close</span>
      <TextInput
        type="text"
        label="Title"
        placeholder="Add a title"
        value={title}
        onChange={handleTitleChange}
        errorState={errorState}
      />
      <TextInput
        type="text"
        label="Description"
        placeholder="Add a description"
        value={description}
        onChange={handleDescriptionChange}
        errorState={errorState}
      />
      {errorState && <div>Title is required</div>}
      {title && <button onClick={() => createNewTask()}>Create Task</button>}
    </NewTaskFormContainer>
  );
};

const Task = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: ${colors.lightGray};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const NewTaskFormContainer = styled(Task)`
  height: fit-content;
  gap: 0.5rem;
`;

const TextInput = styled.input`
  width: 100%;
  height: 2rem;
  border: ${(props) =>
    props.errorState ? `1px solid ${colors.red}` : `1px solid ${colors.black}`};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

export { NewTaskForm };
