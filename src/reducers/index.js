import { createSelector } from "reselect";
import { TASK_STATUSES } from "../constants";

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
  searchTerm: "",
};

export default function tasks(state = initialState, action) {
  //if passed as an undefined, then state will be taking the initialState object
  //directly

  //initial action is a special type of init action

  //so when the redux app loads, it will triggers a init action
  switch (action.type) {
    case "CREATE_TASK":
      return { tasks: state.tasks.concat(action.payload) };

    case "FETCH_TASKS_STARTED": {
      return {
        ...state,
        isLoading: true,
      };
    }

    case "FETCH_TASKS_SUCCEEDED": {
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
      };
    }

    case "FETCH_TASKS_FAILED": {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }

    case "CREATE_TASK_SUCCEEDED": {
      return {
        // no flag set in here indicating no setting flag for create-task at first
        ...state,
        tasks: state.tasks.concat(action.payload.task),
      };
    }

    case "EDIT_TASK_SUCCEEDED": {
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.task.id) {
            return action.payload.task;
          }
          return task;
        }),
      };
    }

    case "FILTER_TASKS": {
      return { ...state, searchTerm: action.payload.searchTerm };
    }
    default:
      return state;
  }
}

// the logic of get the state from the store and then transform the shape of the data
// which will be ready for the view to use is called selector function
// in this case, both tasks and searchTerm will be extracted out from the store

//input selector listed below
const getTasks = (state) => state.tasks.tasks;
const getSearchTerm = (state) => state.tasks.searchTerm;

export const getFilteredTasks = createSelector(
  [getTasks, getSearchTerm],
  (tasks, searchTerm) => {
    console.log("selector runs");
    return tasks.filter((task) =>
      task.title.match(new RegExp(searchTerm, "i"))
    );
  }
);

export const getGroupedAndFilteredTasks = createSelector(
  [getFilteredTasks],
  (tasks) => {
    const grouped = {};
    TASK_STATUSES.forEach((status) => {
      grouped[status] = tasks.filter((task) => task.status === status);
    });
    return grouped;
  }
);

// what gets returned from above will be further used by the view
