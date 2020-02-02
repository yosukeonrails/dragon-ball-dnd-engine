import React from "react";
import DragonElement from "./DragonElement";

class ScheduleWeek extends React.Component {
  constructor(props) {
    super(props);
  }

  onDrop(data) {
    console.log(data);
  }
  renderEvents() {
    console.log(this.props.events);

    let events = this.props.events.map(event => {
      let { minuteHeight } = this.props;
      let height =
        minuteHeight * event.duration.h * 4 +
        minuteHeight * (event.duration.m / 15);

      let topPosition =
        minuteHeight * event.dateTime.time.h * 4 +
        minuteHeight * (event.dateTime.time.m / 15);

      console.log(event.description);
      console.log(event.dateTime.time.m / 15);

      let eventComponent = (
        <div className="event" style={{ height: height, top: topPosition }}>
          <p>{event.description}</p>
          <p>{event.dateTime.time.h + ":" + event.dateTime.time.m}</p>
        </div>
      );

      return (
        <DragonElement
          id={event.id}
          itemData={event}
          child={eventComponent}
          onDragonDrop={this.onDrop}
          ref="draggonChild"
          parentClass="ball"
          increment={minuteHeight}
          ghostComponent={eventComponent}
        />
      );
    });

    return events;
  }

  render() {
    let height = this.props.minuteHeight * 4 * 25;
    return (
      <div className="week-container" style={{ height, touchAction: "none" }}>
        {this.renderEvents()}
      </div>
    );
  }
}

export default ScheduleWeek;
