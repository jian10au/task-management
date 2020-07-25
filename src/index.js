import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
// import tasksReducer from './reducers';
import { projects, page } from "./reducers";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = (state = {}, action) => {
  // run from the rootReducer to slice reducer
  // pass the undefined at the beginning;
  // taskReducer takes the undefined and immediates set the slice state to
  // {tasks:[],isLoading:false}
  console.log("root reducer starts and state is ", state);
  return {
    // tasks: tasksReducer(state.tasks, action),
    projects: projects(state.projects, action),
    page: page(state.page, action),
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const mockTasks = [
  {
    id: 1,
    title: "Learn Redux",
    description: "The store, actions, and reducers, oh my!",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Peace on Earth",
    description: "No big deal.",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Reset your mind",
    description: "Remove the negative thoughts in your mind",
    status: "Unstarted",
  },
  {
    id: 4,
    title: "Complete Nagok e-commerce store prototype",
    description: "No big deal.",
    status: "Unstarted",
  },
];

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
