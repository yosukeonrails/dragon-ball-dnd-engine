import React from "react";
import Ghost from "./Ghost";

class DragonBallElement extends React.Component {
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
    let x = event.pageX;
    let y = event.pageY;

    // console.log(
    //   this._reactInternalFiber.child._debugOwner.memoizedProps.parentClass
    // );
    // let all of the target class know that something is being dragged
    this.props.updateGlobalState({
      elementBeingDragged: this.props.item
    });

    this.setState({
      elementBeingDragged: this.props.item,
      currentX: x,
      currentY: y
    });
  }

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
        // display: "none"
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

  updateMousePosition() {
    let event = window.event;
    let x = event.pageX;
    let y = event.pageY;

    let initalWidth = this.refs.child.parentNode.clientWidth;
    //  console.log(this.refs.child.parentNode.clientHeight);
    let componentHeight = this.refs.child.parentNode.clientHeight;
    if (this.state.elementBeingDragged) {
      let { currentX, currentY } = this.state;

      if (!currentX || !currentY) {
        console.log("no initials");
        return;
      }

      let x_difference = currentX - x;
      let y_difference = currentY - y;
      console.log(y_difference);
      if (Math.abs(x_difference) >= 50) {
        this.setState({
          currentX: x,
          elementX: x - initalWidth / 2
        });
      }

      if (Math.abs(y_difference) >= 50) {
        this.setState({
          currentY: y,
          elementY: y - initalWidth / 2
        });
      }
    }
  }

  render() {
    // console.log(this.props.initialCoordinates);
    const style = {
      position: "fixed",
      display: "block",
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
        <div
          onMouseLeave={() => {
            // let event = window.event;
            // let x = event.pageX;
            // let y = event.pageY;

            this.setState({
              mouseIsOut: true
            });
          }}
          style={style}
        >
          {ghost()}
        </div>
      </div>
    );
  }
}

export default DragonBallElement;
