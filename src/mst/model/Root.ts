import { types, Instance, destroy } from "mobx-state-tree";
import { TaskModel } from "./Tasks";
import { values } from "mobx";

const RootStore = types
  .model("Root", {
    tasks: types.optional(types.map(TaskModel), {}),
  })
  .actions((self) => ({
    // Agrega un task nuevo
    addToDo(id: string, task: string, complete: boolean) {
      self.tasks.set(id, TaskModel.create({ task, complete }));
    },
    // Elimina task
    deleteTask(item: Task) {
      destroy(item);
    },
  }))
  .views((self) => ({
    // Solo se veran los tasks que no esten completos
    get hideCompleted() {
      return values(self.tasks).filter((task: any) => task.complete === false);
    },
    // Muestra todos los tasks
    get allTasks() {
      return values(self.tasks);
    },
  }));

export const store = RootStore.create({
  tasks: { "1": { task: "Agrega una nueva tarea" } },
});

export type Root = Instance<typeof RootStore>;

export type Task = Instance<typeof TaskModel>;
