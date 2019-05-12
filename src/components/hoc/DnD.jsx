import React from "react";
import { connect } from "react-redux";
import { setDeskId } from "../../actions.js";

class DragDrop extends React.Component {
  dragElement = null;
  dropElement = null;
  closestElement = null;

  dragStart = e => {
    this.dragElement = e.target;
  };
  drag = e => {
    e.target.style.opacity = 0;
  };
  dragEnd = e => {
    e.target.style.opacity = 1;
  };

  dragOver = e => {
    this.dropElement = e.target.closest(".desk");
    if (this.dropElement) {
      e.preventDefault();
    }
  };

  dragEnter = e => {};

  dragLeave = e => {};

  drop = e => {
    e.preventDefault();
    const closestTask = e.target.closest(".task");
    if (closestTask) {
      this.props.setDeskId(
        +this.dragElement.id,
        +this.dropElement.id,
        +closestTask.id
      );
    } else {
      this.props.setDeskId(+this.dragElement.id, +this.dropElement.id);
    }
  };

  render() {
    return (
      <div
        id="dnd_wrap"
        onDragStart={this.dragStart}
        onDrag={this.drag}
        onDragEnd={this.dragEnd}
        onDragOver={this.dragOver}
        onDragEnter={this.dragEnter}
        onDragLeave={this.dragLeave}
        onDrop={this.drop}
      >
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDeskId: (taskId, deskId, closestTaskId) =>
      dispatch(setDeskId(taskId, deskId, closestTaskId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DragDrop);
