"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import useStore from "../store/use-store";
import { cloneDeep } from "lodash";
import { TaskStatus } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";

type IData = {
  id: number;
  title: string;
  description: string;
  status: string;
};

type IField = "title" | "description" | "status";

function Page() {
  const { token } = useStore();
  const [list, setList] = useState<IData[]>([]);
  const [inputTitle, setInputTitle] = useState<string>("");

  useEffect(() => {
    if (!token) return;
    getDataList();
  }, [token]);

  const getDataList = async () => {
    const response = await fetch("api/task", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setList(data);
  };

  const handleCreate = async () => {
    const response = await fetch("api/task", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: inputTitle,
        description: "Description",
        status: TaskStatus.PENDING,
      }),
    });
    const data = await response.json();
    setList((prevList) => [...prevList, data]);
    setInputTitle("");
  };

  const handleChangeInput = (id: number, field: string, value: string) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleEdit = async (id: number, field: IField, value: string) => {
    if (!token) return;
    const cloneData = cloneDeep(list.find((item) => item.id === id));
    if (!cloneData) return;
    cloneData[field] = value;
    setList((prevList) =>
      prevList.map((item) => (item.id === id ? cloneData : item))
    );

    await fetch("api/task", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cloneData),
    });
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    setList((prevList) => prevList.filter((item) => item.id !== id));
    await fetch("api/task", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <ScrollArea className="w-full h-[90vh] border border-gray-200">
        <table className="min-w-full table-auto border-collapse ">
          <thead>
            <tr className="text-left">
              <th className="p-2 border  border-gray-300">Title</th>
              <th className="p-2 border  border-gray-300">Description</th>
              <th className="p-2 border  border-gray-300">State</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td className="p-2 border border-gray-300">{item.title}</td>
                <td className="p-2 border border-gray-300">
                  <Input
                    value={item.description}
                    onChange={(e) =>
                      handleChangeInput(item.id, "description", e.target.value)
                    }
                    onBlur={(e) =>
                      handleEdit(item.id, "description", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border border-gray-300">
                  <select
                    className="border rounded px-2 py-1"
                    value={item.status}
                    onChange={(e) =>
                      handleEdit(item.id, "status", e.target.value)
                    }
                  >
                    <option value={TaskStatus.PENDING}>PENDING</option>
                    <option value={TaskStatus.COMPLETED}>COMPLETED</option>
                    <option value={TaskStatus.CANCELLED}>CANCELLED</option>
                  </select>
                </td>
                <td className="p-2 border border-gray-300">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
      <div className="flex flex-row justify-center w-auto gap-4">
        <Input
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder="Add your task here"
          className="mt-4"
        />
        <Button
          disabled={inputTitle === ""}
          onClick={handleCreate}
          variant="outline"
          className="mt-4 w-min"
        >
          Add New Task
        </Button>
      </div>
    </div>
  );
}

export default Page;
