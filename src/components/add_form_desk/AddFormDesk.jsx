import React from "react";
import { addDesk } from "../../actions";
import { connect } from "react-redux";
import "./add_form_desk.css";

class AddFormDesk extends React.Component {
  state = {
    active: false,
    title: ""
  };

  handleClick = () => {
    this.setState({
      active: !this.state.active,
      title: ""
    });
  };

  handleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addDesk({
      title: this.state.title
    });
    this.setState({
      active: false,
      title: ""
    });
  };

  render() {
    return (
      <div className="add_form_desk">
        {this.state.active ? (
          <a href="#" onClick={this.handleClick}>
            отмена
          </a>
        ) : (
          <a href="#" onClick={this.handleClick}>
            добавить доску
          </a>
        )}
        {this.state.active && (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
              name="desk"
              placeholder="название доски"
            />
          </form>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return { addDesk: desk => dispatch(addDesk(desk)) };
};

export default connect(
  null,
  mapDispatchToProps
)(AddFormDesk);
