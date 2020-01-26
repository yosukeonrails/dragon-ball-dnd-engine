import React from "react";
import Ball from "./Ball";
import DragonBallElement from "./DragonBallElement";
import DragonBallTarget from "./DragonBallTarget";

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementBeingDragged: null
    };
  }

  dispatchOnElementDropped() {
    console.log("do somehting here if its taken out");
  }

  updateGlobalState() {
    console.log("update state");
  }

  render() {
    return (
      <div>
        <div className="box">
          {/* <DragonBallTarget globalState={this.props.globalState} /> */}
        </div>
      </div>
    );
  }
}

export default Box;
