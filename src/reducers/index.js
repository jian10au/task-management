export default function tasks(state = { tasks: [] }, action) {
  switch (action.type) {
    case 'CREATE_TASK':
      return { tasks: state.tasks.concat(action.payload) };
    case 'EDIT_TASK':
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            // const updateTask = task;
            // return { ...updateTask, status: action.payload.status };
            const updateTask = {
              ...task,
              ...action.payload.params,
            };
            return updateTask;
            // or Object.assign({}, task, payload.params)
          }
          return task;
        }),
      };
    case 'FETCH_TASKS_SUCCEEDED': {
      return {
        tasks: action.payload.tasks,
      };
    }
    case 'CREATE_TASK_SUCCEEDED': {
      return {
        tasks: state.tasks.concat(action.payload.task),
      };
    }
    default:
      return state;
  }
}
