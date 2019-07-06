import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("submit");
    this.props.history.push("/events");
  }

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input id="username" name="username" type="text" />
          <label htmlFor="pswd">Password: </label>
          <input id="pswd" name="pswd" type="text" />
          <label htmlFor="cpswd">Confirm password: </label>
          <input id="cpswd" name="cpswd" type="text" />

          <input type="button" value="Register" />
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
