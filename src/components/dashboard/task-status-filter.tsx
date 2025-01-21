import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

/**
 * A component for selecting task status to filter tasks.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {string} props.value - The current selected status.
 * @param {function} props.onChange - Function to call when the status changes.
 *
 * @example
 * <TaskStatusFilter value="PENDING" onChange={(newValue) => console.log(newValue)} />
 */
export default function TaskStatusFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}) {
  const statusTypes = ["ALL", "PENDING", "COMPLETED", "CANCELLED"];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-auto max-w-lg">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statusTypes.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
