"use client";
import { ITask } from "@/interfaces";
import useTasksStore from "@/app/store/use-tasks-store";
import { useEffect } from "react";
import TaskItem from "./task-item";

export default function TaskList({ list }: { list: ITask[] }) {
  const { list: tasks, setList } = useTasksStore();

  useEffect(() => {
    setList(list);
  }, []);

  return (
    <div>
      <table className="min-w-full table-auto border-collapse ">
        <thead>
          <tr className="text-left">
            <th className="p-2 border  border-gray-300">Title</th>
            <th className="p-2 border  border-gray-300">Description</th>
            <th className="p-2 border  border-gray-300">State</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item) => (
            <TaskItem key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
