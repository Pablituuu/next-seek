import { IField, ITask } from "@/interfaces";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TaskStatus } from "@prisma/client";
import useTokenStore from "@/app/store/use-token-store";
import { cloneDeep } from "lodash";
import useTasksStore from "@/app/store/use-tasks-store";
import { deleteTask, updateTask } from "@/service/client";

export default function TaskItem({ item }: { item: ITask }) {
  const { token } = useTokenStore();
  const { setList, list } = useTasksStore();

  const handleEdit = (id: number, field: IField, value: string) => {
    if (!token) return;
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

  const handleChangeInput = (id: number, field: IField, value: string) => {
    const cloneItem = cloneDeep(item);
    cloneItem[field] = value;
    setList(list.map((item) => (item.id === id ? cloneItem : item)));
  };

  const handleDelete = (id: number) => {
    if (!token) return;
    setList(list.filter((item) => item.id !== id));
    deleteTask(token, id);
  };

  return (
    <tr key={item.id}>
      <td className="p-2 border border-gray-300">{item.title}</td>
      <td className="p-2 border border-gray-300">
        <Input
          value={item.description}
          onChange={(e) =>
            handleChangeInput(item.id, "description", e.target.value)
          }
          onBlur={(e) => handleEdit(item.id, "description", e.target.value)}
        />
      </td>
      <td className="p-2 border border-gray-300">
        <select
          className="border rounded px-2 py-1"
          value={item.status}
          onChange={(e) => handleEdit(item.id, "status", e.target.value)}
        >
          <option value={TaskStatus.PENDING}>PENDING</option>
          <option value={TaskStatus.COMPLETED}>COMPLETED</option>
          <option value={TaskStatus.CANCELLED}>CANCELLED</option>
        </select>
      </td>
      <td className="p-2 border border-gray-300">
        <Button variant="destructive" onClick={() => handleDelete(item.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
}
