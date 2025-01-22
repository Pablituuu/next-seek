import { ScrollArea } from "@/components/ui/scroll-area";
import { getTasks } from "@/service/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateTaskContainer from "@/components/dashboard/create-task";
import TaskListContainer from "@/components/dashboard/task-list-container";
import UserMenuContainer from "@/components/dashboard/user-menu";

async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/auth/signin");
  const tasks = await getTasks();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <ScrollArea className="w-full h-[90vh] border border-gray-200">
        <TaskListContainer list={tasks} />
      </ScrollArea>
      <div>
        <CreateTaskContainer />
        <UserMenuContainer />
      </div>
    </div>
  );
}

export default Page;
