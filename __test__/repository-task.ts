import { getTasks } from "@/service/server";

describe("Repository Task", () => {
    it("should return a list of tasks", async () => {
        const tasks = await getTasks();
        expect(tasks.lenght).toBeGreaterThanOrEqual(0)
    });
});