import React from 'react';
const Task = (props) => {
  return (
    <div className="task">
      <div className="task­header">
        <label htmlFor={props.task.id}>Change Status:</label>
        <select
          onChange={(event) => {
            props.onStatusChange({
              taskId: props.task.id,
              status: event.target.value,
            });
          }}
          name="status"
          id={props.task.id}
        >
          <option value="Unstarted">Unstarted</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Compeleted</option>
        </select>
        <div>
          <h3>{props.task.title}</h3>
        </div>
      </div>

      <div className="task­body">{props.task.description}</div>
      <hr />
    </div>
  );
};
export default Task;
