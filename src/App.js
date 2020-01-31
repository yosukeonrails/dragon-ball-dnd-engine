import React from "react";
import DragonBallTarget from "./DragonBallTarget";
import Box from "./Box";
import Ball from "./Ball";
import "./App.css";
import DragonElement from "./DragonElement";

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
      let boxComponent = (
        <Box item={box} globalState={this.state} id={box.id} />
      );
      return (
        <div>
          <DragonBallTarget targetComponent={boxComponent} />
        </div>
      );
    });
  }

  renderBalls() {
    return this.state.balls.map((ball, index) => {
      let ballComponent = <div className="ball"></div>;
      return (
        <div className="ball-wrapper">
          <DragonElement
            // globalX={this.state.globalX}
            // globalY={this.state.globalY}
            id={ball.id}
            itemData={ball}
            child={ballComponent}
            ref="draggonChild"
            parentClass="ball"
            getMeasurements={this.getMeasurements}
            measurements={this.state.measurements}
            ghostComponent={ballComponent}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div
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
