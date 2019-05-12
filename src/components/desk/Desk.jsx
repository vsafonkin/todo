import React from "react";
import { connect } from "react-redux";
import Task from "../task/Task.jsx";
import ColorPanel from "../color_panel/ColorPanel.jsx";
import { removeDesk } from "../../actions";
import "./desk.css";
import hamb from "./hamb.svg";

class Desk extends React.Component {
  state = {
    tuneActive: false
  };

  handleTuneClick = () => {
    this.setState({ tuneActive: !this.state.tuneActive });
  };

  handleRemoveClick = event => {
    this.props.removeDesk(event.target.id);
  };

  handleDeskClick = () => {
    this.setState({ tuneActive: false });
  };

  render() {
    const tasks = this.props.tasks.map(item => {
      return <Task key={item.id} task={item} />;
    });

    return (
      <div
        className="desk"
        id={this.props.deskId}
        style={{ background: this.props.color }}
      >
        <div className="tune_desk">
          <img
            src={hamb}
            onClick={this.handleTuneClick}
            style={{ cursor: "pointer" }}
          />
          {this.state.tuneActive && (
            <div className="tune_panel">
              <ColorPanel deskId={this.props.deskId} />
              <div className="remove_task">
                {!tasks.length && (
                  <a
                    href="#"
                    id={this.props.deskId}
                    onClick={this.handleRemoveClick}
                  >
                    удалить доску
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="wrap_tasks" onClick={this.handleDeskClick}>
          <div className="desk_title">
            <b>{this.props.title}</b>
          </div>
          {tasks}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeDesk: deskId => dispatch(removeDesk(deskId))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Desk);
