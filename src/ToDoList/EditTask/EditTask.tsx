import React, { useState } from "react";
import "./EditTask.css";
import { observer } from "mobx-react";
import { Task } from "../../mst/model/Root";

interface Props {
  task: Task;
}

const EditTask: React.FC<Props> = observer(({ task }) => {
  const [editableTask, setEditableTask] = useState<string>("");

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
    <div className={`editTask`}>
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
