import React from "react";
import { blue } from "ansi-colors";
import leftPad from "left-pad";

class DragonBallTarget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }

  render() {
    return (
      <div
        onMouseEnter={() => {
          console.log("mosuse entered target");
        }}
      >
        {this.props.targetComponent}
      </div>
    );
  }
}

export default DragonBallTarget;
