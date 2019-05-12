import React from "react";
import { connect } from "react-redux";
import { loadDesks, loadTasks } from "../../actions.js";
import AddFormTask from "../add_form_task/AddFormTask.jsx";
import AddFormDesk from "../add_form_desk/AddFormDesk.jsx";
import Desk from "../desk/Desk.jsx";
import "./app.css";

function load_data(url, callback) {
  fetch(url)
    .then(response => response.json())
    .then(data => callback(data));
}

class App extends React.Component {
  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("todo_19811210vs"));
    if (!data) {
      load_data("tasks.json", this.props.loadTasks);
      load_data("desks.json", this.props.loadDesks);
    } else {
      this.props.loadDesks(data.desks);
      this.props.loadTasks(data.tasks);
    }
  }

  componentDidUpdate() {
    localStorage.setItem(
      "todo_19811210vs",
      JSON.stringify({ tasks: this.props.tasks, desks: this.props.desks })
    );
  }

  render() {
    const desks = this.props.desks.map(item => {
      return (
        <Desk
          key={item.id}
          title={item.title}
          deskId={item.id}
          color={item.color}
          tasks={this.props.tasks.filter(elem => elem.status === item.id)}
        />
      );
    });

    return (
      <div id="App">
        <div id="header">
          <AddFormTask desks={this.props.desks} />
        </div>
        <div id="content">
          {desks}
          <AddFormDesk />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    tasks: store.tasks.tasks,
    desks: store.desks.desks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTasks: tasks => dispatch(loadTasks(tasks)),
    loadDesks: desks => dispatch(loadDesks(desks))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
