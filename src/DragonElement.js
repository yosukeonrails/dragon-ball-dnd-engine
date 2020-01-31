import React from "react";
import Ghost from "./Ghost";

class DragonElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elementX: null,
      elementY: null,
      dragging: false,
      elementBeingDragged: false,
      mouseIsOut: false
    };

    this.mouseIsUp = this.mouseIsUp.bind(this);
    this.updateMousePosition = this.updateMousePosition.bind(this);
    this.ghostMouseOut = this.ghostMouseOut.bind(this);
  }

  componentWillMount() {
    window.addEventListener("mousemove", this.updateMousePosition);
    window.addEventListener("mouseup", this.mouseIsUp);
  }

  handleMouseDown(e) {
    let event = window.event;

    if (e.touches) {
      event = e.touches[0];
    }

    let x = event.pageX;
    let y = event.pageY;

    // this.props.updateGlobalState({
    //   elementBeingDragged: this.props.item
    // });

    let measurements = this.getMeasurements();
    console.log(measurements);
    this.setState({
      elementBeingDragged: this.props.itemData,
      currentX: x,
      currentY: y,
      elementX: measurements.left,
      elementY: measurements.top
    });
  }

  getMeasurements = () => {
    let ref = this.refs.myReactRef;
    if (ref) {
      if (ref) {
        let rect = ref.getBoundingClientRect();
        console.log(rect);
        let measurements = {
          width: rect.width,
          top: rect.top,
          left: rect.left
        };
        console.log(measurements);
        return measurements;
      }
    }
    return;
  };

  returnElementStyle() {
    if (this.state.elementBeingDragged) {
      return {
        display: "block",
        position: "fixed",
        left: this.state.elementX,
        top: this.state.elementY
      };
    } else {
      return {
        display: "none"
      };
    }
  }

  mouseIsUp() {
    this.setState({
      elementBeingDragged: null,
      elementY: null,
      elementX: null,
      mouseIsOut: false
    });
  }

  ghostMouseOut() {
    this.setState({
      mouseIsOut: true
    });
  }

  updateMousePosition(e) {
    e.preventDefault();

    let event = window.event;

    if (e.touches) {
      event = e.touches[0];
    }

    let x = event.pageX;
    let y = event.pageY;

    if (this.state.elementBeingDragged) {
      console.log(x, y);
      let { currentX, currentY } = this.state;

      if (!currentX || !currentY) {
        console.log("no initials");
        return;
      }

      let x_difference = currentX - x;
      let y_difference = currentY - y;
      let increment = 50;

      let sign_of_y = -1 * Math.sign(y_difference);
      let sign_of_x = -1 * Math.sign(x_difference);

      if (Math.abs(x_difference) >= increment) {
        let new_elementX = this.state.elementX + increment * sign_of_x;

        this.setState({
          currentX: x,
          elementX: new_elementX
        });
      }

      if (Math.abs(y_difference) >= increment) {
        let new_elementY = this.state.elementY + increment * sign_of_y;

        this.setState({
          currentY: y,
          elementY: new_elementY
        });
      }
    }
  }

  render() {
    // console.log(this.props.initialCoordinates);
    const style = {
      position: "fixed",
      backgroundColor: "#6967e6db",
      ...this.returnElementStyle()
    };

    let ghost = () => {
      return (
        <Ghost
          ghostMouseOut={this.ghostMouseOut}
          child={this.props.ghostComponent}
        />
      );
    };

    return (
      <div ref="child">
        <div className="dragon-ball-ghost" style={style}>
          {ghost()}
        </div>
        <div
          className="dragon-ball-child"
          // ref={this.refCallback}
          ref="myReactRef"
          onMouseDown={e => {
            this.handleMouseDown(e);
          }}
          onTouchStart={e => {
            console.log("start touch");
            this.handleMouseDown(e);
          }}
          onTouchMove={e => {
            this.updateMousePosition(e);
          }}
          onTouchEnd={() => {
            console.log("touch end");
            this.mouseIsUp();
          }}
        >
          {this.props.child}
        </div>
      </div>
    );
  }
}

export default DragonElement;
