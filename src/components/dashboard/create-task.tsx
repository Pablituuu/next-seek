"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createTask } from "@/service/client";
import useTokenStore from "@/app/store/use-token-store";
import useTasksStore from "@/app/store/use-tasks-store";

export default function CreateTask() {
  const [inputTitle, setInputTitle] = useState<string>("");
  const { token } = useTokenStore();
  const { setList, list } = useTasksStore();

  const handleCreate = () => {
    if (!token) return;
    createTask(token, inputTitle);
    setList([
      ...list,
      {
        id: list.length + 1,
        title: inputTitle,
        description: "Description",
        status: "Pending",
      },
    ]);
    setInputTitle("");
  };

  return (
    <div className="flex flex-row">
      <Input
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        placeholder="Add your task here"
        className="mt-4"
      />
      <Button
        disabled={inputTitle === ""}
        onClick={handleCreate}
        variant="outline"
        className="mt-4 w-min"
      >
        Add New Task
      </Button>
    </div>
  );
}
