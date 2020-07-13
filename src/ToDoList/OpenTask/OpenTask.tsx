import React from "react";
import { observer } from "mobx-react";
import { Task } from "../../mst/model/Root";
import "./OpenTask.css";

interface Props {
  task: Task;
}

const OpenTask: React.FC<Props> = observer(({ task }) => {
  return (
    // Modal para ver la tarea completa
    <div className="modal-background" onClick={(e) => task.toggleTruncate()}>
      <div id="openTask">
        <div className="modal-content">
          <p>{task.task}</p>
        </div>
      </div>
    </div>
  );
});

export default OpenTask;
