import React, { Component } from "react";
import { Link } from "react-router-dom";
import Routes from "./Routes";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class Nav extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <ul className="navbar">
          <li className="logo">
            <Link to="/">Logo</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jobfairs">Job fairs</Link>
          </li>
          <li>
            <Link to="/walkins">Walkins</Link>
          </li>
          <li>
            <Link to="/competitions">Competitions</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to={`/about/${this.props.uid}`}>{this.props.username}</Link>
          </li>
        </ul>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default Nav;
