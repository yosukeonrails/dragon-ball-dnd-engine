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

  componentDidUpdate() {
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

    let measurements = this.getMeasurements();

    this.setState({
      elementBeingDragged: this.props.itemData,
      currentX: x,
      currentY: y,
      elementX: measurements.left,
      elementY: measurements.top,
      initialLeft: measurements.left,
      initialTop: measurements.top
    });
  }

  getMeasurements = () => {
    let ref = this.refs.myReactRef;
    if (ref) {
      if (ref) {
        let rect = ref.getBoundingClientRect();

        let measurements = {
          width: rect.width,
          top: rect.top,
          left: rect.left
        };

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
    window.removeEventListener("mousemove", this.updateMousePosition);
    window.removeEventListener("mouseup", this.mouseIsUp);

    if (this.state.elementBeingDragged) {
      this.props.onDragonDrop(this.state.data);
      this.setState({
        elementBeingDragged: null,
        elementY: null,
        elementX: null,
        mouseIsOut: false
      });
    }
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
      let { currentX, currentY } = this.state;

      if (!currentX || !currentY) {
        return;
      }

      let x_difference = currentX - x;
      let y_difference = currentY - y;
      let increment = this.props.increment;

      let sign_of_y = -1 * Math.sign(y_difference);
      let sign_of_x = -1 * Math.sign(x_difference);

      if (Math.abs(x_difference) >= increment.sensitivityX) {
        let new_elementX = this.state.elementX + increment.x * sign_of_x;

        this.setState({
          currentX: x,
          elementX: new_elementX
        });
      }

      if (Math.abs(y_difference) >= increment.sensitivityY) {
        let multiplier = y_difference / increment.sensitivityY;
        let additionalIncrement = 0;

        if (Math.abs(multiplier) > 2) {
          let result =
            Math.sign(multiplier) > 0
              ? Math.floor(multiplier)
              : Math.ceil(multiplier);

          additionalIncrement = increment.y * result;
          console.log(currentY);
          console.log("JUMPED TO");
          console.log(y);
        }

        let new_elementY =
          this.state.elementY + (increment.y + additionalIncrement) * sign_of_y;

        this.setState({
          currentY: y,
          elementY: new_elementY
        });
      }
    }

    let { itemData, parentClass, id, increment } = this.props;
    let {
      elementX,
      elementY,
      elementBeingDragged,
      pageX,
      pageY,
      initialTop,
      initialLeft
    } = this.state;

    let data = {
      itemData,
      parentClass,
      id,
      increment,
      left_position_of_ghost: elementX,
      top_position_of_ghost: elementY,
      elementBeingDragged,
      x_coordinate_of_mouse: pageX,
      y_coordinate_of_mouse: pageY,
      initial_top_position: initialTop,
      initial_left_position: initialLeft
    };

    this.setState({
      pageX: x,
      pageY: y,
      data
    });

    this.props.onDragon(data);
  }

  render() {
    const style = {
      position: "fixed",
      touchAction: "none",
      // transition: ".05s",
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
            this.props.onDragonStartDrag();
          }}
          onTouchStart={e => {
            this.handleMouseDown(e);
            this.props.onDragonStartDrag();
          }}
          onTouchMove={e => {
            this.updateMousePosition(e);
          }}
          onTouchEnd={() => {
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
