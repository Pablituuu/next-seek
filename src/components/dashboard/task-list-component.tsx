import { ITask } from "@/interfaces";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TaskStatusFilter from "./task-status-filter";
import { Label } from "../ui/label";
import TaskItemContainer from "./task-item-container";
import { Dispatch, SetStateAction } from "react";

interface TaskListComponentProps {
  tasks: ITask[];
  statusFilter: string;
  onFilterChange: Dispatch<SetStateAction<string>>;
}

/**
 * Presentational component for rendering a list of tasks.
 *
 * @function TaskListComponent
 * @param {Object} props - The component props.
 * @param {ITask[]} props.tasks - The filtered list of tasks.
 * @param {string} props.statusFilter - The current filter status.
 * @param {Function} props.onFilterChange - Event handler for changing the status filter.
 */
export default function TaskListComponent({
  tasks,
  statusFilter,
  onFilterChange,
}: TaskListComponentProps) {
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
          {tasks.map((item) => (
            <TaskItemContainer key={item.id} item={item} />
          ))}
        </TableBody>
      </Table>
      <div className="items-center justify-center gap-4 mt-4 grid grid-cols-3">
        <Label className="flex-grow text-right text-sm">Filter by status</Label>
        <TaskStatusFilter value={statusFilter} onChange={onFilterChange} />
      </div>
    </div>
  );
}
