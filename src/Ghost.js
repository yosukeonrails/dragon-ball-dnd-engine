import React from "react";

class Ghost extends React.Component {
  render() {
    return (
      <div
        onMouseOut={() => {
          this.props.ghostMouseOut();
        }}
      >
        {this.props.child}
      </div>
    );
  }
}

export default Ghost;
