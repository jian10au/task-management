import React, { Component } from "react";
import TasksPage from "./components/TasksPage";
import { connect, useSelector } from "react-redux";
import {
  createTask,
  editTask,
  fetchTasks,
  filterTasks,
  fetchProjects,
  setCurrentProjectId,
} from "./actions/index";
import FlashMessage from "./components/FlashMessage";
import { getFilteredTasks, getGroupedAndFilteredTasks } from "./reducers";
import Header from "./components/Header";

// const App = (props) => {
//   const tasks = useSelector((state) => state.tasks);

//   return (
//     <div className="main­content">
//       <TasksPage tasks={tasks} />
//     </div>
//   );
// };

class App extends Component {
  // just by looking at the data you pass to the onCreateTask and onStatusChange function
  // it seems to me there is a undeniable preference for us to wrap all the data into object
  // into the event handler function and redux action
  // {title, description} -- create
  // {status} which will be {params:{status:status}} within the action - edit
  onCreateTask = ({ title, description }) => {
    // add curent projectid in here
    const { projectId } = this.props;
    console.log("projectId in onCreateTask :", projectId);
    this.props.dispatch(createTask({ projectId, title, description }));
  };

  onStatusChange = (id, status) => {
    // convention 1; always wraps your data within a {} other than the id
    this.props.dispatch(editTask(id, { status }));
  };

  onSearch = (searchTerm) => {
    // console.log(searchTerm);
    console.log("onSearch runs");
    this.props.dispatch(filterTasks(searchTerm));
  };

  onCurrentProjectChange = (e) => {
    this.props.dispatch(setCurrentProjectId(Number(e.target.value)));
  };

  componentDidMount() {
    console.log("mount and ready to dispatch action");
    // this.props.dispatch(fetchTasks());

    // step 1
    this.props.dispatch(fetchProjects());
  }

  render() {
    console.log("rendered");
    if (this.props.isLoading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        {this.props.error && <FlashMessage message={this.props.error} />}
        <div className="main­content">
          <Header
            projects={this.props.projects}
            onCurrentProjectChange={this.onCurrentProjectChange}
          />
          <TasksPage
            tasks={this.props.tasks}
            onCreateTask={this.onCreateTask}
            onStatusChange={this.onStatusChange}
            onSearch={this.onSearch}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //glue component props with the redux store key
  const { isLoading, error, items } = state.projects;
  const { currentProjectId } = state.page;
  // the stage where we prepare the data for rendering is called selecting process
  // in this case; the shape of the redux stroe does not have

  // notice, in this case, I basically remove the requirement that you need to pass a specific slide of the
  // state to the selector, and let the selector go only handling the overall state;

  // notice, in here the original shape of the store is [{id:1, task:''},{id:2, task:''},{id:3, task:''}]

  const tasks = getGroupedAndFilteredTasks(state);

  // getFilteredTasks is a selector;
  // notice, in my current implementation the tasks is no longer a store property
  // you need to get tasks by taking additional measures

  // it gets the series of tasks from the redux store
  // filter out the task whose title is not matching with the searchTerm and return the remaining tasks
  // selected result back to the view for view to render:
  // the resultant tasks is an array const tasks = [{},{}]

  // by convention, the selector function is stored in the same place as the reducers

  console.log("mapStateToProps runs", tasks);
  console.log(currentProjectId, "does app have projectId");
  return {
    projects: items,
    projectId: currentProjectId,
    tasks,
    isLoading,
    error,
  };
};

export default connect(mapStateToProps)(App);
