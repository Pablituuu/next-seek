import { ScrollArea } from "@/components/ui/scroll-area";
import TaskList from "@/components/dashboard/task-list";
import CreateTask from "@/components/dashboard/create-task";
import UserMenu from "@/components/dashboard/user-menu";
import { getTasks } from "@/service/server";

async function Page() {
  const tasks = await getTasks();
  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <ScrollArea className="w-full h-[90vh] border border-gray-200">
        <TaskList list={tasks} />
      </ScrollArea>
      <div className="flex flex-row justify-center w-auto gap-4">
        <CreateTask />
        <UserMenu />
      </div>
    </div>
  );
}

export default Page;
