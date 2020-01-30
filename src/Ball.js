import React, { useRef } from "react";
import StarIcon from "@material-ui/icons/Star";
import DragonBallElement from "./DragonBallElement";
class Ball extends React.Component {
  constructor(props) {
    super(props);

    this.refCallback = this.refCallback.bind(this);
    this.state = {
      initialX: null,
      initialY: null,
      measurements: null
    };
  }

  refCallback = element => {
    if (element && this.state.measurements == null) {
      let rect = element.getBoundingClientRect();
      let measurements = {
        width: rect.width,
        top: rect.top,
        left: rect.left
      };
      console.log(measurements);

      this.setState({
        measurements: measurements
      });

      return measurements;
    }

    return null;
  };

  getMeasurements() {}

  handleMouseDown(e) {
    let event = window.event;
    let x = event.pageX;
    let y = event.pageY;

    this.refs.draggonChild.handleMouseDown(e);
  }

  render() {
    return (
      <div className="ball-wrapper">
        {this.props.ghost ? (
          <div className="ball"></div>
        ) : (
          <div
            className="ball"
            ref={this.refCallback}
            onMouseDown={e => {
              this.handleMouseDown(e);
            }}
          >
            <DragonBallElement
              ref="draggonChild"
              parentClass="ball"
              item={this.props.item}
              measurements={this.state.measurements}
              ghostComponent={<Ball ghost={true} />}
              updateGlobalState={state => {
                console.log("let everyone know this is being dragged");
                this.props.updateGlobalState(state);
              }}
            />
            <div>
              <StarIcon />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Ball;
