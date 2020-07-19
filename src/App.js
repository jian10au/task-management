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
  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  };

  onStatusChange = ({ taskId, status }) => {
    this.props.dispatch(editTask({ taskId, status }));
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
