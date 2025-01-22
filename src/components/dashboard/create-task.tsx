"use client";
import { useState } from "react";
import { createTask } from "@/service/client";
import useTokenStore from "@/app/store/use-token-store";
import useTasksStore from "@/app/store/use-tasks-store";
import { TaskStatus } from "@prisma/client";
import CreateTask from "./create-task-component";

export default function CreateTaskContainer() {
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");
  const [stateSelect, setStateSelect] = useState<TaskStatus>("PENDING");
  const { token } = useTokenStore();
  const { setList, list } = useTasksStore();
  const [onOpen, setOpen] = useState(false);

  const handleCreate = async () => {
    const task = await createTask(
      token,
      inputTitle,
      inputDescription,
      stateSelect
    );
    setList([...list, task]);
    setInputDescription("");
    setStateSelect("PENDING");
    setInputTitle("");
    setOpen(false);
  };

  return (
    <CreateTask
      inputTitle={inputTitle}
      setInputTitle={setInputTitle}
      inputDescription={inputDescription}
      setInputDescription={setInputDescription}
      stateSelect={stateSelect}
      setStateSelect={setStateSelect}
      onOpen={onOpen}
      setOpen={setOpen}
      handleCreate={handleCreate}
    />
  );
}
