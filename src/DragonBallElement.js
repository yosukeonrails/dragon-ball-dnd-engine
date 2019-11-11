import React from "react";

class DragonBallElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elementX: null,
      elementY: null,
      dragging: false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.updateMousePosition = this.updateMousePosition.bind(this);
  }

  componentWillMount() {
    window.addEventListener("mousemove", this.updateMousePosition);
  }

  returnElementStyle() {
    if (this.props.parentState.elementBeingDragged) {
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

  elementWasDropped() {
    this.setState({
      dragging: false
    });
  }

  handleMouseUp() {
    this.props.updateGlobalState({
      elementBeingDragged: null
    });
  }

  handleMouseDown(bool) {
    this.setState({
      dragging: bool
    });

    // Here we need a method that will update
    // the global state
    this.props.onDragon();
    this.props.updateGlobalState({
      elementBeingDragged: this.props.component.props.item,
      data: {}
    });
  }

  render() {
    const item = this.props.component.props.item;

    return (
      <div
        style={{ display: "inline-block" }}
        onMouseDown={() => {
          console.log(item);
          this.handleMouseDown(true);
        }}
      >
        {this.props.component}
        <div
          style={this.returnElementStyle()}
          onMouseUp={() => {
            this.props.onDragonDrop(this.props.parentState.elementBeingDragged);
            this.handleMouseUp();
          }}
        >
          {this.props.component}
        </div>
      </div>
    );
  }
}

export default DragonBallElement;
