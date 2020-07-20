import React from 'react';

const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed'];

const Task = (props) => {
  return (
    <div className="task">
      <div className="task­header">
        <label htmlFor={props.task.id}>Change Status:</label>
        <select
          value={props.task.status}
          // only after I add the above line of code, the app start to work as expected why
          onChange={(event) => {
            console.log('event triggered');
            props.onStatusChange(props.task.id, event.target.value);
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
