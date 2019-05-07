import React from "react";
import "./color_panel.css";
import { setDeskColor } from "../../actions";
import { connect } from "react-redux";

class ColorPanel extends React.Component {
  state = {
    active: false,
    color: ""
  };

  handleClick = () => {
    this.setState({
      active: !this.state.active
    });
  };

  changeColor = value => () => {
    this.props.setColor(this.props.desk_id, value);
  };

  colors = [
    "#e1f3de",
    "#b3caaf",
    "#e6d6ac",
    "#98ebcf",
    "#dfeea8",
    "#728fa7",
    "#dde7f0",
    "#483D8B",
    "#A52A2A",
    "#FFC0CB",
    "#4682B4",
    "#46AFAF",
    "#F0E68C",
    "#FA5858"
  ];

  render() {
    const colors = this.colors.map((item, index) => {
      return (
        <div
          key={index}
          className="color_item"
          style={{ background: item, cursor: "pointer" }}
          onClick={this.changeColor(item)}
        />
      );
    });
    return (
      <div className="color_panel">
        {this.state.active ? (
          <a href="#" onClick={this.handleClick} />
        ) : (
          <a href="#" onClick={this.handleClick}>
            настроить цвет
          </a>
        )}
        {this.state.active && <div className="colors">{colors}</div>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setColor: (desk_id, color) => dispatch(setDeskColor(desk_id, color))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ColorPanel);
