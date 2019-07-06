import React, { Component } from "react";

class Event extends Component {
  handleSumbmit(event) {
    event.preventDefault();
  }
  render() {
    const {
      event_id,
      event_name,
      event_type,
      user_id,
      posted_by,
      description,
      date_posted,
      date_from,
      date_to,
      locations,
      no_of_openings,
      companies,
      attendees,
      links,
      organizer_email,
      event_status
    } = this.props;
    return (
      <div className="event-container">
        <div className="e-details">
          <div className="info e-name">
            <label>Name:</label> <p>{event_name}</p>
          </div>
          <div className="info e-type">
            <label>Type:</label> <p>{event_type}</p>
          </div>
          <div className="info e-date">
            <label>Date:</label> <p>{date_from}</p>
          </div>
          <div className="info e-location">
            <label>Location:</label> <p>{locations}</p>
          </div>
          <div className="info e-companies">
            <label>Companies:</label> <p>{companies}</p>
          </div>
          <div className="info e-attendees">
            <label>Attendees:</label> <p>{attendees}</p>
          </div>
        </div>
        <div className="info e-desc">
          <label>Description:</label> <p>{description}</p>
          <form>
            <input
              className="event-register btn"
              type="submit"
              value="Register"
              onClick={event => this.handleSumbmit(event)}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Event;
