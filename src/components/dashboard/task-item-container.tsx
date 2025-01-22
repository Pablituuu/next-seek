import { IField, ITask } from "@/interfaces";
import useTokenStore from "@/app/store/use-token-store";
import { cloneDeep } from "lodash";
import useTasksStore from "@/app/store/use-tasks-store";
import { deleteTask, updateTask } from "@/service/client";
import TaskItemComponent from "./task-item-component";

/**
 * Container component for managing the logic related to a single task item.
 *
 * @function TaskItemContainer
 * @param {Object} props - The component props.
 * @param {ITask} props.item - The task item to display and manipulate.
 *
 * @example
 * return (
 *   <TaskItemContainer item={task} />
 * )
 */
export default function TaskItemContainer({ item }: { item: ITask }) {
  const { token } = useTokenStore();
  const { setList, list } = useTasksStore();

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

  const handleChangeInput = (id: number, field: IField, value: string) => {
    const cloneItem = cloneDeep(item);
    cloneItem[field] = value;
    setList(list.map((item) => (item.id === id ? cloneItem : item)));
  };

  const handleDelete = (id: number) => {
    setList(list.filter((item) => item.id !== id));
    deleteTask(token, id);
  };

  return (
    <TaskItemComponent
      item={item}
      onChange={handleChangeInput}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
