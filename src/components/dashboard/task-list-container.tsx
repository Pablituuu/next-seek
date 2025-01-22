"use client";
import { useEffect, useState } from "react";
import useTasksStore from "@/app/store/use-tasks-store";
import { ITask } from "@/interfaces";
import TaskListComponent from "./task-list-component";

interface TaskListContainerProps {
  list: ITask[];
}

/**
 * Container component for managing task list logic, including filtering.
 *
 * @function TaskListContainer
 * @param {Object} props - The component props.
 * @param {ITask[]} props.list - The initial list of tasks to display.
 *
 * @example
 * return (
 *   <TaskListContainer list={tasks} />
 * )
 */
export default function TaskListContainer({ list }: TaskListContainerProps) {
  const { list: tasks, setList } = useTasksStore();
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    setList(list);
  }, [list, setList]);

  const filteredTasks = tasks.filter(
    (task) => task.status === statusFilter || statusFilter === "ALL"
  );

  return (
    <TaskListComponent
      tasks={filteredTasks}
      statusFilter={statusFilter}
      onFilterChange={setStatusFilter}
    />
  );
}
