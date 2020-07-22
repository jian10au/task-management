import React, { Component } from "react";
import TasksPage from "./components/TasksPage";
import { connect, useSelector } from "react-redux";
import { createTask, editTask, fetchTasks, filterTasks } from "./actions/index";
import FlashMessage from "./components/FlashMessage";

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
    this.props.dispatch(createTask({ title, description }));
  };

  onStatusChange = (id, status) => {
    // convention 1; always wraps your data within a {} other than the id
    this.props.dispatch(editTask(id, { status }));
  };

  onSearch = (searchTerm) => {
    // console.log(searchTerm);
    this.props.dispatch(filterTasks(searchTerm));
  };

  componentDidMount() {
    console.log("mount and logged");
    this.props.dispatch(fetchTasks());
  }

  render() {
    console.log("App mounted", "loading status:", this.props.isLoading);
    if (this.props.isLoading) {
      return <div>Loading</div>;
    }

    return (
      <div>
        {this.props.error && <FlashMessage message={this.props.error} />}
        <div className="main­content">
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
  const { isLoading, error, searchTerm } = state.tasks;

  // the stage where we prepare the data for rendering is called selecting process
  // in this case; the shape of the redux stroe does not have
  const tasks = state.tasks.tasks.filter((task) => {
    return task.title.match(new RegExp(searchTerm, "i"));
  });

  return {
    tasks,
    isLoading,
    error,
  };
};

export default connect(mapStateToProps)(App);
