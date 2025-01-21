import { ScrollArea } from "@/components/ui/scroll-area";
import TaskList from "@/components/dashboard/task-list";
import CreateTask from "@/components/dashboard/create-task";
import UserMenu from "@/components/dashboard/user-menu";
import { getTasks } from "@/service/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/auth/signin");
  const tasks = await getTasks();
  console.log(tasks);
  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <ScrollArea className="w-full h-[90vh] border border-gray-200">
        <TaskList list={[]} />
      </ScrollArea>
      <div>
        <CreateTask />
        <UserMenu />
      </div>
    </div>
  );
}

export default Page;
