import React from "react";
import { connect } from "react-redux";
import { addTask } from "../../actions";
import "./add_form_task.css";

class AddFormTask extends React.Component {
  state = {
    active: false,
    title: "",
    text: "",
    deskId: 0
  };

  handleClick = () => {
    this.setState({
      active: !this.state.active,
      title: "",
      text: "",
      deskId: this.props.desks.length ? this.props.desks[0].id : 0
    });
  };

  handleChange = event => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  handleSelectChange = event => {
    console.log(event.target.value);
    this.setState({ deskId: +event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addTask({
      title: this.state.title,
      description: this.state.text,
      deskId: this.state.deskId
    });
    this.setState({
      active: false,
      title: "",
      text: "",
      deskId: this.props.desks.length ? this.props.desks[0].id : 0
    });
  };

  render() {
    const deskSelectList = this.props.desks.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.title}
        </option>
      );
    });
    return (
      <div className="add_form">
        {this.state.active || (
          <a href="#" onClick={this.handleClick}>
            добавить карточку
          </a>
        )}
        {this.state.active && (
          <form onSubmit={this.handleSubmit}>
            <p>
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                name="title"
                className="task_title"
                placeholder="заголовок"
              />
            </p>
            <p>
              <textarea
                value={this.state.value}
                onChange={this.handleChange}
                name="text"
                className="task_description"
                placeholder="описание задачи"
              />
            </p>
            <div className="select_desk">
              {this.props.desks.length ? (
                <select onChange={this.handleSelectChange}>
                  {deskSelectList}
                </select>
              ) : (
                "все добавленные задачи появятся на первой добавленной доске"
              )}
            </div>
            <div className="buttons_block">
              <input
                type="submit"
                value="добавить"
                className="buttons submit"
              />
              <button onClick={this.handleClick} className="buttons cancel">
                отмена
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    tasks: store.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: data => dispatch(addTask(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFormTask);
