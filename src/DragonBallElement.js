import React from "react";

class DragonBallElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elementX: null,
      elementY: null,
      dragging: false,
      elementBeingDragged: false,
      initialX: this.props.initialCoordinates.x,
      initialY: this.props.initialCoordinates.y
    };

    this.updateMousePosition = this.updateMousePosition.bind(this);
  }

  componentWillMount() {
    window.addEventListener("mousemove", this.updateMousePosition);
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

    let initalWidth = this.refs.child.parentNode.clientWidth;

    // this.setState({
    //   elementX: x - halfOfInitialWidth / 2,
    //   elementY: y - halfOfInitialWidth / 2
    // });

    if (this.state.elementBeingDragged) {
      let { initialX, initialY } = this.state;

      let x_difference = initialX - x;
      let y_difference = initialY - y;

      if (Math.abs(x_difference) >= initalWidth) {
        console.log("update x position");
        this.setState({
          initialX: x,
          elementX: x - initalWidth / 2
        });
      }

      if (Math.abs(y_difference) >= 50) {
        console.log("update y position");
        this.setState({
          initialY: y,
          elementY: y - initalWidth / 2
        });
      }
    }
  }

  render() {
    // console.log(this.props.initialCoordinates);
    const style = {
      backgroundColor: "#6967e6db",
      ...this.returnElementStyle()
    };

    let ghost = () => {
      return this.props.ghostComponent;
    };

    return (
      <div ref="child">
        <div
          onMouseUp={() => {
            this.setState({
              elementBeingDragged: null
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
