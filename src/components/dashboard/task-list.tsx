"use client";
import { ITask } from "@/interfaces";
import useTasksStore from "@/app/store/use-tasks-store";
import { useEffect } from "react";
import TaskItem from "./task-item";
import useValidateToken from "@/hoks/use-validate-token";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function TaskList({ list }: { list: ITask[] }) {
  const { list: tasks, setList } = useTasksStore();
  // useValidateToken();
  useEffect(() => {
    setList(list);
  }, []);

  return (
    <div>
      <Table className="min-w-full table-auto border-collapse ">
        <TableHeader>
          <TableRow className="text-left">
            <TableHead className="p-2 border  border-gray-300">Title</TableHead>
            <TableHead className="p-2 border  border-gray-300">
              Description
            </TableHead>
            <TableHead className="p-2 border  border-gray-300">State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((item) => (
            <TaskItem key={item.id} item={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
