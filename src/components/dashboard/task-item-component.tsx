import { IField, ITask } from "@/interfaces";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TaskStatus } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TableCell, TableRow } from "../ui/table";

interface TaskItemComponentProps {
  item: ITask;
  onChange: (id: number, field: IField, value: string) => void;
  onEdit: (id: number, field: IField, value: string) => void;
  onDelete: (id: number) => void;
}

/**
 * Presentational component for displaying and interacting with a single task item.
 *
 * @function TaskItemComponent
 * @param {Object} props - The component props.
 * @param {ITask} props.item - The task item to display.
 * @param {Function} props.onChange - Handler for input change (without immediate task update).
 * @param {Function} props.onEdit - Handler for editing the task fields.
 * @param {Function} props.onDelete - Handler for deleting the task item.
 */
export default function TaskItemComponent({
  item,
  onChange,
  onEdit,
  onDelete,
}: TaskItemComponentProps) {
  return (
    <TableRow key={item.id}>
      <TableCell className="p-2 border border-gray-300">{item.title}</TableCell>
      <TableCell className="p-2 border border-gray-300">
        <Input
          value={item.description}
          onChange={(e) => onChange(item.id, "description", e.target.value)}
          onBlur={(e) => onEdit(item.id, "description", e.target.value)}
        />
      </TableCell>
      <TableCell className="p-2 border border-gray-300">
        <Select
          value={item.status}
          onValueChange={(value) => onEdit(item.id, "status", value)}
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
      </TableCell>
      <TableCell className="p-2 border border-gray-300">
        <Button variant="destructive" onClick={() => onDelete(item.id)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
