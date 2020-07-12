import React, { useState } from "react";
import ToDoList from "./ToDoList/ToDoList";
import { observer } from "mobx-react";
import shortid from "shortid";
import "./App.css";

const App = observer(({ store }: any) => {
  const [show, setShow] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string | number>("");

  // Funcion que muestra y oculta el listado
  const handleClick = () => {
    setShow(!show);
  };

  // Funcion que toma el valor del input y lo setea en el useState
  const handleChange = (e: any) => {
    setNewTask(e.target.value);
  };

  // Funcion que al darle click en Agregar te agrega una nueva tarea y te resetea el input
  const handleSubmit = () => {
    !!newTask && store.addToDo(shortid.generate(), newTask, false);
    setNewTask("");
  };

  return (
    <div id="container">
      <h1>Lista de Tareas</h1>
      {/* Boton que despliega u oculta la lista de los ToDo */}
      <button onClick={handleClick}>
        {show ? "Mostrar completadas" : "Ocultar completadas"}
      </button>
      {/* Agrega nueva tarea */}
      <div id="newTask">
        <input
          onChange={handleChange}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          value={newTask}
          type="text"
          placeholder="Nueva Tarea"
        />
        <button onClick={(e) => handleSubmit()}>Agregar</button>
      </div>
      {/* El listado de los ToDo */}
      <ToDoList tasks={show ? store.hideCompleted : store.allTasks} />
    </div>
  );
});

export default App;
