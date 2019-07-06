import React, { Component } from "react";
import "../../css/AddEvent.css";
import { addEvent } from "../../services/actions/eventsActions";
import { connect } from "react-redux";

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const eInfo = parseForm(e.target);
    this.props.addEvent(eInfo);
  }

  generateForm() {
    return (
      <form className="add-new-event" onSubmit={this.handleSubmit}>
        <div className="add-new-event-fields">
          <div className="form-fields">
            {formFields.section1.map(field => getFormField(field))}
          </div>
          <div className="form-fields">
            {formFields.section2.map(field => getFormField(field))}
          </div>
        </div>
        <div className="add-new-event-submit">
          <input type="submit" className="btn" value="submit" />
        </div>
      </form>
    );
  }

  render() {
    return this.generateForm();
  }
}

function getFormField({ type, id, text }) {
  return (
    <div>
      <label htmlFor={id}>{text} </label>
      <input type={type} id={id} />
    </div>
  );
}

function parseForm(data) {
  const eInfo = {};
  formFields.section1.forEach(f => (eInfo[f.id] = data[f.id].value));
  formFields.section2.forEach(f => (eInfo[f.id] = data[f.id].value));
  return eInfo;
}

const formFields = {
  section1: [
    { type: "text", id: "event_name", text: "Event name: " },
    { type: "text", id: "description", text: "Description: "},
    { type: "text", id: "event_type", text: "Event type: " },
    { type: "text", id: "location", type: "Location: " }
  ],
  section2: [
    { type: "date", id: "date_from", text: "From: " },
    { type: "date", id: "date_to", text: "To: " },
    { type: "text", id: "links", text: "Links: " },
    { type: "text", id: "organizer_email", text: "Contact email: " }
  ]
};

export default connect(
  null,
  {addEvent}
)(AddEvent);
