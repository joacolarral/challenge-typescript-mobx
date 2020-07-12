import React, { useState } from "react";
import "./EditTask.css";
import { observer } from "mobx-react";

const EditTask = observer(({ task }: any) => {
  const [editableTask, setEditableTask] = useState<string | number>("");

  // Funcion que muestra y oculta el listado

  // Funcion que toma el valor del input y lo setea en el useState
  const handleChange = (e: any) => {
    setEditableTask(e.target.value);
  };

  // Funcion que al darle click en Agregar te agrega una nueva tarea y te resetea el input
  const handleSubmit = () => {
    !!editableTask && task.setTask(editableTask);
    setEditableTask("");
    task.toggleEdit();
  };

  return (
    <div id="editTask">
      <input
        className="editInput"
        onChange={handleChange}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        value={editableTask}
        type="text"
        placeholder="Cambie su tarea"
      />
      <button onClick={(e) => handleSubmit()} className="editButton">
        Guardar
      </button>
    </div>
  );
});

export default EditTask;