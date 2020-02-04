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
    this.onDragonDrop = this.onDragonDrop.bind(this);
    this.onDragon = this.onDragon.bind(this);
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

  convertMinutesToHourObject = m => {
    let h = 0;

    while (m >= 60) {
      m = m - 60;
      h = h + 1;
    }

    return { h: h, m: m };
  };

  getHourDataByData(updateEvent) {
    let weekMovement =
      (-1 *
        (updateEvent.initial_left_position -
          updateEvent.left_position_of_ghost)) /
      updateEvent.increment.x;

    let originalTotalMinutes =
      updateEvent.elementBeingDragged.dateTime.time.h * 60 +
      updateEvent.elementBeingDragged.dateTime.time.m;

    let difference =
      (updateEvent.top_position_of_ghost - updateEvent.initial_top_position) /
      this.props.minuteHeight;

    let totalMinutes = originalTotalMinutes + difference * 15;

    let hourObject = this.convertMinutesToHourObject(totalMinutes);

    return {
      hourObject,
      weekMovement
    };
  }

  onDragon(data) {
    if (!data.elementBeingDragged) {
      return;
    }

    this.props.makeCursorDisappear(true);

    this.setState({
      newData: this.getHourDataByData(data)
    });
  }
  onDragonDrop(data) {
    this.props.onDragonDrop(data, this.state.newData);
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

      let ghostComponent;

      if (this.state.newData) {
        ghostComponent = (
          <div className="event" style={{ height: height, top: topPosition }}>
            <p>{event.description}</p>
            <p>
              {this.state.newData.hourObject.h +
                ":" +
                this.state.newData.hourObject.m}
            </p>
          </div>
        );
      }

      return (
        <DragonElement
          styleData={{
            height: height,
            top: topPosition
          }}
          id={event.id}
          itemData={event}
          child={eventComponent}
          onDragonDrop={this.onDragonDrop}
          onDragon={this.onDragon}
          onDragonStartDrag={() => {
            this.setState({
              eventWeekSlotWidth: this.myRef.current.clientWidth
            });
          }}
          parentClass="ball"
          increment={{
            y: minuteHeight,
            x: this.state.eventWeekSlotWidth,
            sensitivityY: minuteHeight,
            sensitivityX: this.state.eventWeekSlotWidth
          }}
          ghostComponent={ghostComponent || eventComponent}
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
