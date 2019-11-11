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
  componentDidMount() {
    var width = document.getElementById("target-wrapper").offsetWidth;
    var height = document.getElementById("target-wrapper").offsetHeight;
    this.setState({
      width,
      height
    });
  }

  handleMouseUp() {
    this.props.onDragonDrop(this.props.parentState.elementBeingDragged);
    this.props.updateGlobalState({
      elementBeingDragged: null
    });
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: "inline-block",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              pointerEvents: "auto",
              backgroundColor: "blue",
              display: "inline-block",
              width: this.state.width,
              height: this.state.height
            }}
            onMouseLeave={() => {
              console.log("mouseleft");
              // make target null
              this.props.updateGlobalState({
                target: null
              });
            }}
            onMouseUp={() => {
              console.log("MOUSE UP");
              // this.props.onDragonDrop(this.props.parentState.elementBeingDragged);
              this.handleMouseUp();
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
            <div
              style={{
                display: "inline-block"
              }}
              id="target-wrapper"
            >
              {this.props.component}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DragonBallTarget;
