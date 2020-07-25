import { createSelector } from "reselect";
import { TASK_STATUSES } from "../constants";

// I will only have one single reducer which is about the projects

// const initialState = {
//   tasks: [],
//   isLoading: false,
//   error: null,
//   searchTerm: "",
// };

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export function projects(state = initialState, action) {
  switch (action.type) {
    case "FETCH_PROJECTS_STARTED": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_PROJECTS_SUCCEEDED": {
      return {
        ...state,
        isLoading: false,
        items: action.payload.projects,
      };
    }

    // well this is knid of crazy!!!
    case "CREATE_TASK_SUCCEEDED": {
      const { task } = action.payload;
      const projectIndex = state.items.findIndex(
        (project) => project.id === task.projectId
      );
      const project = state.items[projectIndex];
      const nextProject = {
        ...project,
        tasks: project.tasks.concat(task),
      };
      return {
        ...state,
        items: [
          ...state.items.slice(0, projectIndex),
          nextProject,
          ...state.items.slice(projectIndex + 1),
        ],
      };
    }

    case "EDIT_TASK_SUCCEEDED": {
      const { task } = action.payload;
      const projectIndex = state.items.findIndex(
        (project) => project.id === task.projectId
      );
      const project = state.items[projectIndex];
      const taskIndex = project.tasks.findIndex((t) => t.id === task.id);
      const nextProject = {
        ...project,
        tasks: [
          ...project.tasks.slice(0, taskIndex),
          task,
          ...project.tasks.slice(taskIndex + 1),
        ],
      };
      return {
        ...state,
        items: [
          ...state.items.slice(0, projectIndex),
          nextProject,
          ...state.items.slice(projectIndex + 1),
        ],
      };
    }

    default:
      return state;
  }
}

// now add a new reducer that handles the page state;
const initialPageState = {
  currentProjectId: null,
  searchTerm: "",
};
export function page(state = initialPageState, action) {
  switch (action.type) {
    case "SET_CURRENT_PROJECT_ID": {
      return {
        ...state,
        currentProjectId: action.payload.id,
      };
    }
    case "FILTER_TASKS": {
      console.log("page reudcer filter task touched?");
      console.log(action.payload);
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };
    }
    default: {
      return state;
    }
  }
}

// export default function tasks(state = initialState, action) {
//   //if passed as an undefined, then state will be taking the initialState object
//   //directly

//   //initial action is a special type of init action

//   //so when the redux app loads, it will triggers a init action
//   switch (action.type) {
//     case "CREATE_TASK":
//       return { tasks: state.tasks.concat(action.payload) };

//     case "FETCH_TASKS_STARTED": {
//       return {
//         ...state,
//         isLoading: true,
//       };
//     }

//     case "FETCH_TASKS_SUCCEEDED": {
//       return {
//         ...state,
//         isLoading: false,
//         tasks: action.payload.tasks,
//       };
//     }

//     case "FETCH_TASKS_FAILED": {
//       return {
//         ...state,
//         isLoading: false,
//         error: action.payload.error,
//       };
//     }

//     case "CREATE_TASK_SUCCEEDED": {
//       return {
//         // no flag set in here indicating no setting flag for create-task at first
//         ...state,
//         tasks: state.tasks.concat(action.payload.task),
//       };
//     }

//     case "EDIT_TASK_SUCCEEDED": {
//       return {
//         tasks: state.tasks.map((task) => {
//           if (task.id === action.payload.task.id) {
//             return action.payload.task;
//           }
//           return task;
//         }),
//       };
//     }

//     case "FILTER_TASKS": {
//       return { ...state, searchTerm: action.payload.searchTerm };
//     }
//     default:
//       return state;
//   }
// }

// the logic of get the state from the store and then transform the shape of the data
// which will be ready for the view to use is called selector function
// in this case, both tasks and searchTerm will be extracted out from the store

//input selector listed below

// const getSearchTerm = (state) => state.tasks.searchTerm;
const getSearchTerm = (state) => state.page.searchTerm;

// refactor from const getTasks = (state) => state.tasks.tasks;
// to below:
const getTasksByProjectId = (state) => {
  if (!state.page.currentProjectId) {
    return [];
  }

  const currentProject = state.projects.items.find(
    (project) => project.id === state.page.currentProjectId
  );

  return currentProject.tasks;
};

export const getFilteredTasks = createSelector(
  [getTasksByProjectId, getSearchTerm],
  (tasks, searchTerm) => {
    console.log("selector runs");
    console.log("what are tasks?", tasks);
    console.log("what are search term", searchTerm);
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
