"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createTask } from "@/service/client";
import useTokenStore from "@/app/store/use-token-store";
import useTasksStore from "@/app/store/use-tasks-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TaskStatus } from "@prisma/client";

export default function CreateTask() {
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
    <Dialog open={onOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mr-4">
        <Button variant="outline">Add New Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Descripton
            </Label>
            <Textarea
              id="username"
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Status
            </Label>

            <Select
              value={stateSelect}
              onValueChange={(value) => setStateSelect(value as TaskStatus)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={TaskStatus.PENDING}>
                    {TaskStatus.PENDING}
                  </SelectItem>
                  <SelectItem value={TaskStatus.COMPLETED}>
                    {TaskStatus.COMPLETED}
                  </SelectItem>
                  <SelectItem value={TaskStatus.CANCELLED}>
                    {TaskStatus.CANCELLED}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={inputTitle === "" && inputDescription === ""}
            type="submit"
            onClick={() => handleCreate()}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
