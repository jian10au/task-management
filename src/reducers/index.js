const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export default function tasks(state = initialState, action) {
  //if passed as an undefined, then state will be taking the initialState object
  //directly

  //initial action is a special type of init action

  //so when the redux app loads, it will triggers a init action
  switch (action.type) {
    case 'CREATE_TASK':
      return { tasks: state.tasks.concat(action.payload) };

    case 'FETCH_TASKS_STARTED': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'FETCH_TASKS_SUCCEEDED': {
      return {
        ...state,
        isLoading: false,
        tasks: action.payload.tasks,
      };
    }

    case 'FETCH_TASKS_FAILED': {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }

    case 'CREATE_TASK_SUCCEEDED': {
      return {
        // no flag set in here indicating no setting flag for create-task at first
        ...state,
        tasks: state.tasks.concat(action.payload.task),
      };
    }

    case 'EDIT_TASK_SUCCEEDED': {
      return {
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.task.id) {
            return action.payload.task;
          }
          return task;
        }),
      };
    }

    default:
      return state;
  }
}
