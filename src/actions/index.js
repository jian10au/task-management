import * as api from '../api/index';
// import all available api method

function createTaskSucceeded(task) {
  return {
    type: 'CREATE_TASK_SUCCEEDED',
    payload: {
      task,
    },
  };
}

export function createTask({ title, description, status = 'Unstarted' }) {
  return (dispatch) => {
    api.createTask({ title, description, status }).then((resp) => {
      dispatch(createTaskSucceeded(resp.data));
    });
  };
}

export function editTask(id, params = {}) {
  return {
    type: 'EDIT_TASK',
    payload: {
      id,
      params,
      // notice this is the params key with a param object
    },
  };
}

export function fetchTasksSucceeded(tasks) {
  return {
    type: 'FETCH_TASKS_SUCCEEDED',
    payload: {
      tasks,
    },
  };
}

export function fetchTasks() {
  // notice the fetchTasks is initialised by the view
  // but the fetchTasksSucceeded is initialised by the server
  return (dispatch) => {
    api.fetchTasks().then((resp) => {
      console.log(resp);
      dispatch(fetchTasksSucceeded(resp.data));
    });
  };
}
