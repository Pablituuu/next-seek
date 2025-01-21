import { IField, ITask } from "@/interfaces";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TaskStatus } from "@prisma/client";
import useTokenStore from "@/app/store/use-token-store";
import { cloneDeep } from "lodash";
import useTasksStore from "@/app/store/use-tasks-store";
import { deleteTask, updateTask } from "@/service/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TableCell, TableRow } from "../ui/table";

/**
 * A component for displaying and interacting with a single task item.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {ITask} props.item - The task item to display and manipulate.
 *
 * @example
 * const task = { id: 1, title: "Title", description: "Description", status: "PENDING" };
 * return (
 *   <TaskItem item={task} />
 * )
 */
export default function TaskItem({ item }: { item: ITask }) {
  const { token } = useTokenStore();
  const { setList, list } = useTasksStore();

  /**
   * Handles the editing of task fields (title, description, status).
   *
   * @function handleEdit
   * @param {number} id - The ID of the task to edit.
   * @param {IField} field - The field of the task to be updated.
   * @param {string} value - The new value of the field.
   */
  const handleEdit = (id: number, field: IField, value: string) => {
    const cloneItem = cloneDeep(item);
    cloneItem[field] = value;
    setList(list.map((item) => (item.id === id ? cloneItem : item)));
    updateTask(
      token,
      id,
      cloneItem.title,
      cloneItem.description,
      cloneItem.status
    );
  };

  /**
   * Handles input changes without immediately updating the task.
   *
   * @function handleChangeInput
   * @param {number} id - The task ID.
   * @param {IField} field - The field being changed.
   * @param {string} value - The new value of the field.
   */
  const handleChangeInput = (id: number, field: IField, value: string) => {
    const cloneItem = cloneDeep(item);
    cloneItem[field] = value;
    setList(list.map((item) => (item.id === id ? cloneItem : item)));
  };

  /**
   * Handles the deletion of a task item.
   *
   * @function handleDelete
   * @param {number} id - The ID of the task to delete.
   */
  const handleDelete = (id: number) => {
    setList(list.filter((item) => item.id !== id));
    deleteTask(token, id);
  };

  return (
    <TableRow key={item.id}>
      <TableCell className="p-2 border border-gray-300">{item.title}</TableCell>
      <TableCell className="p-2 border border-gray-300">
        <Input
          value={item.description}
          onChange={(e) =>
            handleChangeInput(item.id, "description", e.target.value)
          }
          onBlur={(e) => handleEdit(item.id, "description", e.target.value)}
        />
      </TableCell>
      <TableCell className="p-2 border border-gray-300">
        <Select
          value={item.status}
          onValueChange={(value) => handleEdit(item.id, "status", value)}
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
      </TableCell>
      <TableCell className="p-2 border border-gray-300">
        <Button variant="destructive" onClick={() => handleDelete(item.id)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
