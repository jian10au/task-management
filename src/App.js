import React, { Component } from 'react';
import TasksPage from './components/TasksPage';
import { connect, useSelector } from 'react-redux';
import { createTask, editTask } from './actions/index';

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
    this.props.dispatch(editTask(id, { status }));
  };

  render() {
    console.log('props from App: ', this.props);
    return (
      <div className="main­content">
        <TasksPage
          tasks={this.props.tasks}
          onCreateTask={this.onCreateTask}
          onStatusChange={this.onStatusChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps)(App);
