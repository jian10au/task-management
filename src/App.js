import React, { Component } from 'react';
import TasksPage from './components/TasksPage';
import { connect, useSelector } from 'react-redux';
import { createTask, editTask, fetchTasks, filterTasks } from './actions/index';
import FlashMessage from './components/FlashMessage';
import { getFilteredTasks, getGroupedAndFilteredTasks } from './reducers';

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
    console.log('mount and ready to dispatch action');
    this.props.dispatch(fetchTasks());
  }

  render() {
    console.log('rendered');
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
  //glue component props with the redux store key
  const { isLoading, error } = state.tasks;

  // the stage where we prepare the data for rendering is called selecting process
  // in this case; the shape of the redux stroe does not have

  // notice, in this case, I basically remove the requirement that you need to pass a specific slide of the
  // state to the selector, and let the selector go only handling the overall state;

  // notice, in here the original shape of the store is [{id:1, task:''},{id:2, task:''},{id:3, task:''}]

  const tasks = getGroupedAndFilteredTasks(state);

  // getFilteredTasks is a selector;
  // it gets the series of tasks from the redux store
  // filter out the task whose title is not matching with the searchTerm and return the remaining tasks
  // selected result back to the view for view to render:
  // the resultant tasks is an array const tasks = [{},{}]

  // by convention, the selector function is stored in the same place as the reducers

  console.log('mapStateToProps runs', tasks);
  return {
    tasks,
    isLoading,
    error,
  };
};

export default connect(mapStateToProps)(App);
