import React from "react";

class DragDrop extends React.Component {
  render() {
    return <div id="dnd_wrap">{this.props.children}</div>;
  }
}

export default DragDrop;
