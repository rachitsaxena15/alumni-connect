import React, { Component } from "react";
import { connect } from "react-redux";
import { loadEvents } from "../../services/actions/eventsActions";
import Event from "./Event";
import AddEvent from "./AddEvent";

import "../../css/events.css";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddEventForm: false,
      visibleForm: "hide"
    };

    this.toggleForm = this.toggleForm.bind(this);
  }
  componentDidMount() {
    this.props.loadEvents();    
  }

  toggleForm() {
    const { showAddEventForm, visibleForm } = this.state;
    this.setState({
      showAddEventForm: !showAddEventForm,
      visibleForm: visibleForm === "show" ? "hide" : "show"
    });
  }

  render() {
    const { showAddEventForm, visibleForm } = this.state;
    const showHeader = visibleForm === "show" ? "hide" : "show";
    const events = this.props.events.map(event => <Event {...event} />);
    return (
      <div className="events-container">
        <div className="events-info">
          <div className="header">
            <div className="btn" onClick={this.toggleForm}>
              Add new Event
            </div>
            <div className={`add-event ${visibleForm}`}>
              <AddEvent />
            </div>
          </div>
          <div>
            <h3 className={showHeader}>
              Register for the event today!
            </h3>
          </div>
        </div>
        <div className="events">{events}</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  events: state.eventsReducer.events
});

export default connect(
  mapStateToProps,
  { loadEvents }
)(Events);
