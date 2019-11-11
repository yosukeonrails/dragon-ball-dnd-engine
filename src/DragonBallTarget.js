import React from "react";

class DragonBallTarget extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div
        style={{
          pointerEvents: "auto"
        }}
        onMouseLeave={() => {
          console.log("mouseleft");
        }}
        onMouseEnter={() => {
          // update global state of dropped event
          console.log("mouse entered");
          this.props.updateGlobalState({
            target: { id: this.props.component.props.id }
          });
        }}
        id="dragon-ball-target"
      >
        {this.props.component}
      </div>
    );
  }
}

export default DragonBallTarget;
