import React from "react";
import "./OpenTask.css";
import { observer } from "mobx-react";

const OpenTask = observer(({ task }: any) => {
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
