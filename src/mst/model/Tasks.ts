import { types, getParent, cast } from "mobx-state-tree";
import { Root } from "./Root";

export const TaskModel = types
  .model("Task", {
    task: types.optional(types.string, ""),
    complete: types.optional(types.boolean, false),
    edit: types.optional(types.boolean, false),
    truncate: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    // Setea la tarea a realizar
    setTask(newTask: string) {
      self.task = newTask;
    },

    // Cambia la tarea a completada o no
    toggleComplete(): void {
      self.complete = !self.complete;
    },
    // Permite editar la tarea
    toggleEdit(): void {
      self.edit = !self.edit;
    },
    // Despliega el modal para ver la tarea completa
    toggleTruncate(): void {
      self.truncate = !self.truncate;
    },
    // Borra la tarea
    remove(): void {
      const taskParent = getParent<Root>(self, 2);
      taskParent.deleteTask(cast(self));
    },
  }));
