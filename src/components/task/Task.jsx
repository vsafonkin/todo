import React from "react";
import { connect } from "react-redux";
import { removeTask } from "../../actions";
import "./task.css";

class Task extends React.Component {
  handleClick = event => {
    this.props.removeTask(event.target.id);
  };

  render() {
    const { title, description, id } = { ...this.props.task };
    return (
      <div className="task" draggable="true" id={id}>
        <div className="wrap">
          <div className="title">{title}</div>
          <div className="remove_task">
            <a href="#" id={id} onClick={this.handleClick}>
              удалить
            </a>
          </div>
        </div>
        {description ? (
          <div className="description">
            <div className="description_wrap">{description}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeTask: taskId => dispatch(removeTask(taskId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Task);
