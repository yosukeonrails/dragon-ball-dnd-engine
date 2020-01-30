import React, { useRef } from "react";
import StarIcon from "@material-ui/icons/Star";
import DragonBallElement from "./DragonBallElement";
class Ball extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      initialX: null,
      initialY: null
    };
  }

  componentDidMount() {
    if (this.myRef.current) {
      console.log(this.myRef.current.offsetWidth);
    }
  }

  refCallback = element => {
    if (element) {
      let measurements = element.getBoundingClientRect();
      console.log(measurements.width);
      return measurements;
    }

    return null;
  };

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
              refCallback={this.refCallback}
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
