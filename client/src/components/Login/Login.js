import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const {username, pswd} = event.target;
    console.log(username.value, pswd.value);    
    if(username.value && pswd.value){
      localStorage.setItem("username", username.value);  
      localStorage.setItem("pswd", pswd.value);
      console.log(this.props.history);
      this.props.history.push("/events");
    }
  }

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input id="username" name="username" type="text" />
          <label htmlFor="pswd">Password: </label>
          <input id="pswd" name="pswd" type="text" />
          <input type="submit" value="login" />
          <input
            type="button"
            value="Register"
            onClick={() => this.props.history.push("/register")}
          />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
