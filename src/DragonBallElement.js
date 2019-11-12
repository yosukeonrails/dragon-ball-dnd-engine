import React from "react";

class DragonBallElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elementX: null,
      elementY: null,
      dragging: false,
      elementBeingDragged: false
    };

    this.updateMousePosition = this.updateMousePosition.bind(this);
  }

  componentWillMount() {
    window.addEventListener("mousemove", this.updateMousePosition);
  }

  handleMouseDown(e) {
    console.log(
      this._reactInternalFiber.child._debugOwner.memoizedProps.parentClass
    );
    // let all of the target class know that something is being dragged
    this.props.updateGlobalState({
      elementBeingDragged: this.props.item
    });

    this.setState({
      elementBeingDragged: this.props.item
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
        display: "none"
      };
    }
  }

  updateMousePosition() {
    let event = window.event;
    let x = event.pageX;
    let y = event.pageY;

    this.setState({
      elementX: x,
      elementY: y
    });
  }

  render() {
    const style = {
      width: "50px",
      height: "50px",
      backgroundColor: "#6967e6db",
      ...this.returnElementStyle()
    };
    return (
      <div
        onMouseUp={() => {
          this.setState({
            elementBeingDragged: null
          });
        }}
        style={style}
      ></div>
    );
  }
}

export default DragonBallElement;
