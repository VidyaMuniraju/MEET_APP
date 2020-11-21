import React, { Component } from "react";

class Event extends Component {
  state = {
    toggleDetails: false,
  }

  hideDetails = () => {
    if(!this.state.toggleDetails) {
      this.setState({
        toggleDetails: true,
      })
    }
    else {
      this.setState({
        toggleDetails: false,
      })
    }
  }

  render() {
    const { event } = this.props;
    return <div className="event">
      <p className="summary">{event.summary}</p>
      <p className="description">{event.description}</p>
      <p className="start-time">{event.start.dateTime}</p>
      <p className="location">{event.location}</p>
      <button className="hide-details" onClick={() => this.hideDetails()}>
      Hide Details
      </button>


    </div>;
  }
}
export default Event;