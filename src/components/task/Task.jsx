import React from "react";
import { connect } from "react-redux";
import { removeTask, setStatus } from "../../actions";
import { DragSource } from "react-dnd";
import "./task.css";

export const ItemTypes = {
  TASK: "Task"
};

const taskSource = {
  beginDrag(props) {
    return { task_id: props.task.id };
  },
  endDrag(props, monitor) {
    if (monitor.getDropResult()) {
      const desk_id = monitor.getDropResult().desk_id;
      props.setStatus(props.task.id, desk_id);
    }
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Task extends React.Component {
  handleClick = event => {
    this.props.removeTask(event.target.id);
  };

  render() {
    const { title, description, id } = { ...this.props.task };
    return this.props.connectDragSource(
      <div
        className="task"
        style={{
          opacity: this.props.isDragging ? 0 : 1
        }}
      >
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
    removeTask: task_id => dispatch(removeTask(task_id)),
    setStatus: (task_id, status) => dispatch(setStatus(task_id, status))
  };
};

Task = DragSource(ItemTypes.TASK, taskSource, collect)(Task);
export default connect(
  null,
  mapDispatchToProps
)(Task);
