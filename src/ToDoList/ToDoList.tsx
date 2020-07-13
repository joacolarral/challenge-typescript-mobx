import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ToDoList.css";
import { observer } from "mobx-react";
import { Task } from "../mst/model/Root";
import EditTask from "./EditTask/EditTask";
import OpenTask from "./OpenTask/OpenTask";

interface Props {
  tasks: any; // Por que Task[] no funciona?
}

const ToDoList: React.FC<Props> = observer(({ tasks }) => {
  // Acorta el task si es muy largo
  const truncateTask = (task: string) => {
    return task.length > 25 ? `${task.slice(0, 25)}...` : task;
  };

  return (
    <div id="modal">
      <ul>
        {/* Hace un lstado de las tareas */}
        {tasks.map((task: Task, i: number) => (
          <div key={i}>
            {/* Task a hacer y tick si esta completada o no */}
            <li className="item">
              <input
                type="checkbox"
                checked={task.complete}
                onChange={(e) => task.toggleComplete()}
              />
              <div
                onClick={(e) => task.toggleTruncate()} // Abre el modal para que se vea el task completo
                className={!task.complete ? `label` : `labelComplete`}
              >
                {truncateTask(task.task)}
              </div>
              {/* Iconos para editar y borrar */}
              <div className="icons">
                <button className="edit" onClick={(e) => task.toggleEdit()}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete" onClick={(e) => task.remove()}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              {/* Despliega el completo en caso que fuese muy largo */}
              {task.truncate && <OpenTask task={task} />}
            </li>
            {/* Despliega el input para poder editar */}
            {task.edit && <EditTask task={task} />}
          </div>
        ))}
      </ul>
    </div>
  );
});

export default ToDoList;
