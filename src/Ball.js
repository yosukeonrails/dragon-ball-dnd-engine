import React, { useRef } from "react";
import StarIcon from "@material-ui/icons/Star";
import DragonBallElement from "./DragonBallElement";
class Ball extends React.Component {
  handleMouseDown(e) {
    this.refs.draggonChild.handleMouseDown(e);
  }

  render() {
    return (
      <div
        className="ball"
        onMouseDown={e => {
          this.handleMouseDown(e);
        }}
      >
        <DragonBallElement
          ref="draggonChild"
          parentClass="ball"
          item={this.props.item}
          updateGlobalState={state => {
            console.log("let everyone know this is being dragged");

            this.props.updateGlobalState(state);
          }}
        />
        <div>
          <StarIcon />
        </div>
      </div>
    );
  }
}

export default Ball;
