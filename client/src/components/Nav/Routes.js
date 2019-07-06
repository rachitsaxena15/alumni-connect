import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import User from "../user/USER";
import PrivateRoute from "./PrivateRoute";
import Login from "../Login/Login";
import Register from "../Login/Register";
import Home from "../Home";
import NOT_FOUND from "../NOT_FOUND";
import Events from "../event/Events";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact={true} component={Events} />
        <Route path="/jobfairs" component={Events} />
        <Route path="/walkins" component={Events} />
        <Route path="/competitions" component={Events} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user/:id" component={User} />
        <PrivateRoute />
        <Route path="*" component={NOT_FOUND} />
      </Switch>
    );
  }
}

export default Routes;
