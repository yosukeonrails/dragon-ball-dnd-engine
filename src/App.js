import React from "react";
import DragonBallTarget from "./DragonBallTarget";
import Box from "./Box";
import DragonBallElement from "./DragonBallElement";
import Ball from "./Ball";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elementBeingDragged: null,
      balls: [
        { id: "ball-1", number: 1 },
        { id: "ball-2", number: 2 },
        { id: "ball-3", number: 3 },
        { id: "ball-4", number: 4 },
        { id: "ball-5", number: 5 },
        { id: "ball-6", number: 6 },
        { id: "ball-7", number: 7 }
      ],
      boxes: [{ balls: [] }, { balls: [] }, { balls: [] }]
    };

    this.updateGlobalState = this.updateGlobalState.bind(this);
    this.dispatchOnElementDropped = this.dispatchOnElementDropped.bind(this);
  }

  dispatchOnElementDropped(item) {
    this.setState(prevState => {
      let targetId = this.state.target.id;
      let box = prevState.boxes[targetId];

      box.balls.push(item);
      //   let boxes = [...prevState.boxes];
      //   boxes[targetId] = box;
      return {
        boxes: [...prevState.boxes]
      };
    });
  }

  updateGlobalState(state) {
    console.log("updating global state");
    this.setState({
      ...this.state,
      ...state
    });
  }

  renderBoxes() {
    return this.state.boxes.map((box, index) => {
      return (
        <div>
          <Box item={box} globalState={this.state} id={box.id} />{" "}
        </div>
      );
    });
  }

  renderBalls() {
    return this.state.balls.map((ball, index) => {
      return (
        <Ball
          globalX={this.state.globalX}
          globalY={this.state.globalY}
          id={ball.id}
          updateGlobalState={state => {
            this.updateGlobalState(state);
          }}
          item={ball}
        />
      );
    });
  }

  render() {
    return (
      <div
        onMouseUp={() => {}}
        onMouseMove={() => {
          let event = window.event;
          let x = event.pageX;
          let y = event.pageY;
          this.setState({
            globalX: x,
            globalY: y
          });
        }}
      >
        <div className="ball-container">{this.renderBalls()}</div>
        <div className="box-container">{this.renderBoxes()}</div>
      </div>
    );
  }
}

export default App;
