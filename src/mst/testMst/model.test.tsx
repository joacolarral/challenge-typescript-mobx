import { RootStore } from "../model/Root";
import { TaskModel } from "../model/Tasks";
import { values } from "mobx";
import shortid from "shortid";

describe("Models", () => {
  describe("Creating models", () => {
    it("can create a instance of a model", () => {
      const learn = TaskModel.create({
        task: "Learning Javascript",
        complete: false,
      });

      expect(learn.task).toBe("Learning Javascript");
    });

    it("when creating a instance of a Task, complete is optional and its default value is false", () => {
      const learn = TaskModel.create({
        task: "Learning Javascript",
      });

      expect(learn.complete).toBe(false);
    });

    it("can create a Root with empty tasks", () => {
      const todo = RootStore.create({
        tasks: {},
      });

      expect(values(todo.tasks).length).toBe(0);
    });
  });

  describe("Creating actions", () => {
    const todo = RootStore.create({
      tasks: {},
    });
    const learn = TaskModel.create({
      task: "Learning Javascript",
    });

    it("can change task value with an action", () => {
      learn.setTask("Learning Typescript");

      expect(learn.task).toBe("Learning Typescript");
    });

    it("can toggle the property complete of a task to true", () => {
      learn.toggleComplete();

      expect(learn.complete).toBe(true);
    });

    it("can toggle the property edit of a task to true", () => {
      learn.toggleEdit();

      expect(learn.edit).toBe(true);
    });

    it("an action can create new tasks", () => {
      todo.addToDo(shortid(), "Comprar 1 litro de cafe", true);

      expect(values(todo.tasks)[0]["task"]).toBe("Comprar 1 litro de cafe");
      expect(values(todo.tasks).length).toBe(1);
    });
    it("can remove tasks", () => {
      values(todo.tasks)[0].remove();

      expect(values(todo.tasks).length).toBe(0);
    });
  });

  describe("Creating Views", () => {
    const todo = RootStore.create({
      tasks: {},
    });

    todo.addToDo(shortid(), "Learn Javascript", true);
    todo.addToDo(shortid(), "Learn Typescript", true);
    todo.addToDo(shortid(), "Learn React Hooks", true);
    todo.addToDo(shortid(), "Learn Mobx-State-Tree", true);
    todo.addToDo(shortid(), "Learn GraphQL", false);
    todo.addToDo(shortid(), "Learn Ruby", false);

    it("can create a View that brings me all the tasks", () => {
      expect(todo.allTasks.length).toBe(6);
    });
    it("can create a View that brings me only the tasks incompleted", () => {
      expect(todo.hideCompleted.length).toBe(2);
    });
  });
});
