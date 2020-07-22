import React, { Component } from "react";
import TaskList from "./TaskList";
const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];

class TasksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewCardForm: false,
      title: "",
      description: "",
      searchTerm: "",
    };
  }

  onTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };
  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };
  resetForm() {
    this.setState({
      showNewCardForm: false,
      title: "",
      description: "",
    });
  }

  onSearch = (e) => {
    this.props.onSearch(e.target.value);
  };

  onCreateTask = (e) => {
    e.preventDefault();

    // here we fire the redux action
    // if using dispatch here
    // you will do dispatch(CreateTask(title, description))
    this.props.onCreateTask({
      title: this.state.title,
      description: this.state.description,
    });
    this.resetForm();
  };
  toggleForm = () => {
    this.setState({ showNewCardForm: !this.state.showNewCardForm });
  };
  renderTaskLists() {
    //basically returns the task whose title matches with the search term store in the state;
    //when you type in the state changes and the this function returns a new list and re-rendered

    return TASK_STATUSES.map((status) => {
      const statusTasks = this.props.tasks.filter(
        (task) => task.status === status
      );
      return (
        <TaskList
          key={status}
          status={status}
          tasks={statusTasks}
          onStatusChange={this.props.onStatusChange}
        />
      );
    });
  }
  render() {
    return (
      <div className="task-list">
        <div className="task­-list-­header">
          <input onChange={this.onSearch} type="text" placeholder="Search..." />
          <br />
          <br />
          <button className="button button-­default" onClick={this.toggleForm}>
            + New task
          </button>
        </div>
        {this.state.showNewCardForm && (
          <form className="task-­list-­form" onSubmit={this.onCreateTask}>
            <input
              className="full­-width-­input"
              onChange={this.onTitleChange}
              value={this.state.title}
              type="text"
              placeholder="title"
            />
            <input
              className="full­-width-­input"
              onChange={this.onDescriptionChange}
              value={this.state.description}
              type="text"
              placeholder="description"
            />
            <button className="button" type="submit">
              Save
            </button>
          </form>
        )}
        <div
          style={{ display: "flex", justifyContent: "space-around" }}
          className="task­-lists"
        >
          {this.renderTaskLists()}
        </div>
      </div>
    );
  }
}

export default TasksPage;

// style={{ display: 'flex', justifyContent: 'space-around' }}
// className="task­lists"
