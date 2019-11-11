import React from "react";
import Ball from "./Ball";
import DragonBallElement from "./DragonBallElement";

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

  renderBalls() {
    return this.props.balls.map(ball => {
      return (
        <DragonBallElement
          onDragonDrop={item => {
            this.dispatchOnElementDropped(item);
          }}
          onDragon={() => {
            console.log("dragging 1");
          }}
          parentState={this.state}
          updateGlobalState={this.updateGlobalState}
          component={<Ball id={ball.id} item={ball} />}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <div className="box">{this.renderBalls()}</div>
      </div>
    );
  }
}

export default Box;
