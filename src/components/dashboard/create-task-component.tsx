import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
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

interface CreateTaskProps {
  inputTitle: string;
  setInputTitle: React.Dispatch<React.SetStateAction<string>>;
  inputDescription: string;
  setInputDescription: React.Dispatch<React.SetStateAction<string>>;
  stateSelect: TaskStatus;
  setStateSelect: React.Dispatch<React.SetStateAction<TaskStatus>>;
  onOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreate: () => Promise<void>;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  inputTitle,
  setInputTitle,
  inputDescription,
  setInputDescription,
  stateSelect,
  setStateSelect,
  onOpen,
  setOpen,
  handleCreate,
}) => {
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
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={stateSelect}
              onValueChange={(value) => setStateSelect(value as TaskStatus)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a status" />
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
            type="button"
            onClick={handleCreate}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
