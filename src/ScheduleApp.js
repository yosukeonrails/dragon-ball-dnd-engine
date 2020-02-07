import React from "react";
import "./App.css";
import ScheduleWeek from "./ScheduleWeek";

class ScheduleApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [
        {
          id: "event-2",
          description: "event2",
          weekIndex: 0,
          duration: { h: 1, m: 30 },
          dateTime: {
            time: { h: 11, m: 15 },
            endTime: {
              h: 3,
              m: 15
            },
            day: 13,
            month: 0,
            year: 2020
          }
        },
        {
          id: "event-3",
          description: "event3",
          weekIndex: 1,
          duration: { h: 1, m: 45 },
          dateTime: {
            time: { h: 12, m: 30 },
            endTime: {
              h: 3,
              m: 15
            },
            day: 14,
            month: 0,
            year: 2020
          }
        },
        {
          id: "event-4",
          description: "event4",
          weekIndex: 1,
          duration: { h: 2, m: 30 },
          dateTime: {
            time: { h: 3, m: 15 },
            endTime: {
              h: 3,
              m: 15
            },
            day: 14,
            month: 0,
            year: 2020
          }
        },
        {
          id: "event-5",
          description: "event5",
          weekIndex: 2,
          duration: { h: 1, m: 0 },
          dateTime: {
            time: { h: 14, m: 45 },
            endTime: {
              h: 3,
              m: 15
            },
            day: 15,
            month: 0,
            year: 2020
          }
        },
        {
          id: "event-6",
          duration: { h: 0, m: 30 },
          description: "event6",
          weekIndex: 3,
          dateTime: {
            time: { h: 18, m: 0 },
            endTime: {
              h: 3,
              m: 15
            },
            day: 16,
            month: 0,
            year: 2020
          }
        },
        {
          id: "event-7",
          duration: { h: 0, m: 15 },
          description: "event7",
          weekIndex: 4,
          dateTime: {
            time: { h: 8, m: 0 },
            endTime: {
              h: 3,
              m: 15
            },
            day: 17,
            month: 0,
            year: 2020
          }
        },
        {
          id: "event-8",
          description: "event8",
          weekIndex: 5,
          duration: { h: 2, m: 0 },
          dateTime: {
            time: { h: 21, m: 0 },
            endTime: {
              h: 3,
              m: 15
            },
            day: 18,
            month: 0,
            year: 2020
          }
        },
        {
          id: "event-9",
          description: "event9",
          weekIndex: 5,
          duration: { h: 1, m: 15 },
          dateTime: {
            time: { h: 20, m: 15 },
            endTime: {
              h: 3,
              m: 15
            },
            day: 18,
            month: 0,
            year: 2020
          }
        },
        {
          id: "event-10",
          description: "event10",
          weekIndex: 6,
          duration: { h: 2, m: 30 },
          dateTime: {
            time: { h: 6, m: 15 },
            endTime: {
              h: 3,
              m: 15
            },
            day: 19,
            month: 0,
            year: 2020
          }
        }
      ],
      minuteHeight: 24
    };

    this.onDragonDrop = this.onDragonDrop.bind(this);
    this.makeCursorDisappear = this.makeCursorDisappear.bind(this);
  }

  convertMinutesToHourObject = m => {
    let h = 0;

    while (m >= 60) {
      m = m - 60;
      h = h + 1;
    }

    return { h: h, m: m };
  };

  getHourDataByData(data) {
    // let weekMovement =
    //   (-1 *
    //     (updateEvent.initial_left_position -
    //       updateEvent.left_position_of_ghost)) /
    //   updateEvent.increment.x;

    let originalTotalMinutes =
      data.elementBeingDragged.dateTime.time.h * 60 +
      data.elementBeingDragged.dateTime.time.m;
    console.log(originalTotalMinutes);

    // let difference =
    //   (updateEvent.top_position_of_ghost - updateEvent.initial_top_position) /
    //   this.props.minuteHeight;

    let totalMinutes = originalTotalMinutes + data.y_movement * 15;

    return this.convertMinutesToHourObject(totalMinutes);
  }

  onDragonDrop(data) {
    let index = null;
    for (let i = 0; i < this.state.events.length; i++) {
      let event = this.state.events[i];

      if (event.id === data.id) {
        console.log(event.id);
        index = i;
        break;
      }
    }

    let newEvents = [...this.state.events];
    console.log(newEvents);
    let hourObject = this.getHourDataByData(data);

    newEvents[index].dateTime.time.h = hourObject.h;
    newEvents[index].dateTime.time.m = hourObject.m;
    newEvents[index].weekIndex = newEvents[index].weekIndex + data.x_movement;

    this.setState({
      events: newEvents
    });
  }

  renderWeekBackground() {
    let week = [];

    for (let i = 0; i < 7; i++) {
      let hours = [];
      let filteredEvents = this.state.events.filter(event => {
        return event.weekIndex === i;
      });

      for (let i = 0; i < 24; i++) {
        let quarter_hour = [];

        for (let i = 0; i < 4; i++) {
          let color = i === 3 ? "rgb(75, 102, 254)" : "#dadada";

          quarter_hour.push(
            <div
              className="background-15-minute"
              style={{
                height: this.state.minuteHeight,
                borderBottom: "1px solid " + color,
                borderRight: "1px solid rgb(146, 146, 146)"
              }}
            ></div>
          );
        }
        hours.push(<div className="background-hour">{quarter_hour}</div>);
      }

      week.push(
        <div className="background-week">
          <ScheduleWeek
            events={filteredEvents}
            onDragonDrop={this.onDragonDrop}
            minuteHeight={this.state.minuteHeight}
            makeCursorDisappear={this.makeCursorDisappear}
          />
          {hours}
        </div>
      );
    }

    return week;
  }

  makeCursorDisappear(noCursor) {
    this.setState({
      noCursor: noCursor
    });
  }

  render() {
    let hourMarkers = [];

    for (let i = 1; i < 24; i++) {
      hourMarkers.push(
        <div className="schedule-hour-marker">
          <p>{i}</p>
        </div>
      );
    }
    let makeCursorDisappear = this.state.noCursor ? { cursor: "none" } : null;
    return (
      <div style={makeCursorDisappear}>
        <div className="schedule-app-container">
          <div className="schedule-hour-marker-container">{hourMarkers}</div>
          <div className="schedule-background">
            {this.renderWeekBackground()}
          </div>
          {/* <div className="schedule-container">
            {this.renderEventContainer()}
          </div> */}
        </div>
      </div>
    );
  }
}

export default ScheduleApp;
