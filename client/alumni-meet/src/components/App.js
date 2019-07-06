import React from "react";
import "../css/App.css";
import Nav from "./Nav/Nav";
import { Provider } from "react-redux";
import store from "../services/store";

function App() {
  return (
    <Provider store={store}>
      <Nav />      
    </Provider>
  );
}

export default App;
