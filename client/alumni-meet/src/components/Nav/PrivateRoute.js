import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Events from "../event/Events";

class PrivateRoute extends Component {
  isLoggedIn = localStorage.getItem("username") ? true : false;

  render() {
    const { component } = this.props;
    return (
      <Route
        render={props =>
          this.isLoggedIn ? <Events /> : <Redirect to="/login" />
        }
      />
    );
  }
}

export default PrivateRoute;
