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
    this.moveMouse = this.moveMouse.bind(this);
  }

  componentDidUpdate() {
    window.addEventListener("mousemove", this.moveMouse);
    window.addEventListener("mouseup", this.mouseIsUp);
  }
  // componentDidMount() {
  //   window.addEventListener("mousemove", this.moveMouse);
  //   //window.addEventListener("mouseup", this.mouseIsUp);
  //   window.addEventListener("mousedown", e => {
  //     console.log(window.scrollY);
  //     let event = window.event;

  //     let x = event.pageX;
  //     let y = event.pageY;
  //     console.log(x, y);
  //   });
  // }

  moveMouse(e) {
    let { elementBeingDragged } = this.state;
    let measurements = this.getMeasurements();
    if (elementBeingDragged && measurements) {
      if (elementBeingDragged.id === this.props.id) {
        console.log(this.props.id);
      }

      let event = window.event;

      if (e.touches) {
        event = e.touches[0];
      }

      let x = event.pageX;
      let y = event.pageY;

      let differenceY = y - this.props.styleData.top - window.scrollY;
      let differenceX = x - this.state.initialLeft - window.scrollX;

      let y_movement = Math.floor(
        (differenceY - this.state.initialTop) / this.props.increment.y
      );

      let x_movement = Math.floor(differenceX / measurements.width);

      let realPositionOfY =
        this.state.initialTop + y_movement * this.props.increment.y;
      let realPositionOfX =
        this.state.initialLeft + x_movement * measurements.width;

      this.setState({
        elementX: realPositionOfX,
        elementY: realPositionOfY,
        x_movement,
        y_movement
      });
    }
  }

  handleMouseDown(e) {
    let event = window.event;
    console.log(this.props.styleData);
    if (e.touches) {
      event = e.touches[0];
    }

    let x = event.pageX;
    let y = event.pageY;

    let measurements = this.getMeasurements();
    console.log(measurements);
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

    let { itemData, parentClass, id, increment } = this.props;
    let {
      elementX,
      elementY,
      elementBeingDragged,
      pageX,
      pageY,
      initialTop,
      initialLeft,
      x_movement,
      y_movement
    } = this.state;

    let data = {
      itemData,
      parentClass,
      id,
      increment,
      x_movement,
      y_movement,
      left_position_of_ghost: elementX,
      top_position_of_ghost: elementY,
      elementBeingDragged,
      x_coordinate_of_mouse: pageX,
      y_coordinate_of_mouse: pageY,
      initial_top_position: initialTop,
      initial_left_position: initialLeft
    };

    if (this.state.elementBeingDragged) {
      this.props.onDragonDrop(data);
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
    console.log("moved");
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

    // this.props.onDragon(data);
  }

  render() {
    const style = {
      position: "fixed",
      touchAction: "none",
      backgroundColor: "red",
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
            this.moveMouse(e);
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
