import * as api from "../api/index";
import { applyMiddleware } from "redux";
// import all available api method

export function filterTasks(searchTerm) {
  return {
    type: "FILTER_TASKS",
    payload: {
      searchTerm,
    },
  };
}

function createTaskSucceeded(task) {
  return {
    type: "CREATE_TASK_SUCCEEDED",
    payload: {
      task,
    },
  };
}

export function createTask({ title, description, status = "Unstarted" }) {
  return (dispatch) => {
    api.createTask({ title, description, status }).then((resp) => {
      //you are sure that what gets returned is the task object ? {}
      dispatch(createTaskSucceeded(resp.data));
    });
  };
}

export function fetchTasksStarted() {
  return {
    type: "FETCH_TASKS_STARTED",
  };
}

export function fetchTasksSucceeded(tasks) {
  return {
    type: "FETCH_TASKS_SUCCEEDED",
    payload: {
      tasks,
    },
  };
}

export function fetchTasksFailed(error) {
  return {
    type: "FETCH_TASKS_FAILED",
    payload: {
      error,
    },
  };
}

export function fetchTasks() {
  // notice the fetchTasks is initialised by the view
  // but the fetchTasksSucceeded is initialised by the server
  return (dispatch, getState) => {
    // let the fetchTasksStarted run first
    console.log("dispatch fetchTask started");
    dispatch(fetchTasksStarted());
    console.log("state becomes", getState().tasks);
    api
      .fetchTasks()
      .then((resp) => {
        setTimeout(() => dispatch(fetchTasksSucceeded(resp.data)), 2000);
        // throw new Error('Oh noes! Unable to fetch tasks!');
      })
      .catch((err) => dispatch(fetchTasksFailed(err.message)));
  };
}

// step 1 create the async action for editTask first
// notice, since I am passing the params, I am taking the param here again

export function editTask(id, params) {
  // why do you want to have the getState, because later I am going to call the api
  // I need to pass the whole task as the object as the params to the api, the data from frontend is only having
  // one piece of the data from the api, I need to use the exiting redux state to construct a full updated task object

  return (dispatch, getState) => {
    // a. find task from the state
    const task = getState().tasks.tasks.find((task) => task.id === id);

    // b. construct a update task

    // notice, the params in here is {status:"value"}, effectively the object syntax blow construct a new task
    // with the updated value of status
    const updateTask = Object.assign({}, task, params);
    console.log(updateTask);
    // c. call the api
    api
      .editTask(id, updateTask)
      .then((resp) => dispatch(editTaskSucceeded(resp.data)));
  };
}

// step 3 create the sync action creator editTaskSucceeded

export function editTaskSucceeded(task) {
  return {
    type: "EDIT_TASK_SUCCEEDED",
    payload: {
      task,
    },
  };
}

function fetchProjectsStarted(boards) {
  return { type: "FETCH_PROJECTS_STARTED", payload: { boards } };
}
function fetchProjectsSucceeded(projects) {
  return { type: "FETCH_PROJECTS_SUCCEEDED", payload: { projects } };
}
function fetchProjectsFailed(err) {
  return { type: "FETCH_PROJECTS_FAILED", payload: err };
}
export function fetchProjects() {
  return (dispatch, getState) => {
    dispatch(fetchProjectsStarted());
    return api
      .fetchProjects()
      .then((resp) => {
        const projects = resp.data;
        dispatch(fetchProjectsSucceeded(projects));
      })
      .catch((err) => {
        console.error(err);
        fetchProjectsFailed(err);
      });
  };
}
