import React from "react";
import DragonElement from "./DragonElement";

class ScheduleWeek extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      eventWeekSlotWidth: 0
    };

    this.renderEvents = this.renderEvents.bind(this);
  }

  componentWillMount() {
    window.addEventListener(
      "resize",
      () => {
        this.setState({
          eventWeekSlotWidth: this.myRef.current.clientWidth
        });
      },
      true
    );
  }

  onDrop(data) {
    console.log(data);
  }
  renderEvents() {
    let events = this.props.events.map(event => {
      let { minuteHeight } = this.props;
      let height =
        minuteHeight * event.duration.h * 4 +
        minuteHeight * (event.duration.m / 15);

      let topPosition =
        minuteHeight * event.dateTime.time.h * 4 +
        minuteHeight * (event.dateTime.time.m / 15);

      let eventComponent = (
        <div className="event" style={{ height: height, top: topPosition }}>
          <p>{event.description}</p>
          <p>{event.dateTime.time.h + ":" + event.dateTime.time.m}</p>
        </div>
      );

      // let slotWidth = 0 || this.state.eventWidth;

      return (
        <DragonElement
          id={event.id}
          itemData={event}
          child={eventComponent}
          onDragonDrop={this.onDrop}
          onDragonStartDrag={() => {
            this.setState({
              eventWeekSlotWidth: this.myRef.current.clientWidth
            });
          }}
          parentClass="ball"
          increment={{ y: minuteHeight, x: this.state.eventWeekSlotWidth }}
          ghostComponent={eventComponent}
        />
      );
    });

    return events;
  }

  render() {
    let height = this.props.minuteHeight * 4 * 25;
    return (
      <div
        className="week-container"
        ref={this.myRef}
        style={{ height, touchAction: "none" }}
      >
        {this.renderEvents()}
      </div>
    );
  }
}

export default ScheduleWeek;
