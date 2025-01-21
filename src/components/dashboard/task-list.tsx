"use client";
import { ITask } from "@/interfaces";
import useTasksStore from "@/app/store/use-tasks-store";
import { useEffect, useState } from "react";
import TaskItem from "./task-item";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TaskStatusFilter from "./task-status-filter";
import { Label } from "../ui/label";

/**
 * A component that renders a list of tasks inside a table with a status filter.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {ITask[]} props.list - The initial list of tasks to display.
 *
 * @example
 * const tasks = [
 *   { id: 1, title: "Task 1", description: "Description 1", status: "PENDING" },
 *   { id: 2, title: "Task 2", description: "Description 2", status: "COMPLETED" }
 * ];
 * return (
 *   <TaskList list={tasks} />
 * )
 */
export default function TaskList({ list }: { list: ITask[] }) {
  const { list: tasks, setList } = useTasksStore();
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    setList(list);
  }, [list, setList]);

  /**
   * Filters tasks by the selected status filter.
   *
   * @returns {ITask[]} The filtered list of tasks.
   */
  const filteredTasks = tasks.filter(
    (task) => task.status === statusFilter || statusFilter === "ALL"
  );

  return (
    <div>
      <Table className="min-w-full table-auto border-collapse">
        <TableHeader>
          <TableRow className="text-left">
            <TableHead className="p-2 border border-gray-300">TITLE</TableHead>
            <TableHead className="p-2 border border-gray-300">
              DESCRIPTION
            </TableHead>
            <TableHead className="p-2 border border-gray-300">STATUS</TableHead>
            <TableHead className="p-2 border border-gray-300">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((item) => (
            <TaskItem key={item.id} item={item} />
          ))}
        </TableBody>
      </Table>
      <div className="items-center justify-center gap-4 mt-4 grid grid-cols-3 ">
        <Label className="flex-grow text-right text-sm">Filter by status</Label>
        <TaskStatusFilter value={statusFilter} onChange={setStatusFilter} />
      </div>
    </div>
  );
}
