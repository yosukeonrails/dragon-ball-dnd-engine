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
    console.log("PARENT");
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
    let halfOfInitialWidth = this.refs.child.parentNode.clientWidth;

    this.setState({
      elementX: x - halfOfInitialWidth / 2,
      elementY: y - halfOfInitialWidth / 2
    });
  }

  render() {
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
