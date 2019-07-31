import React, {Component} from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import {HashRouter} from "react-router-dom";
import "./sass/index.sass";

class A extends Component{
  render(){
    return (
      <h1>Hello world</h1>
    );
  };
};

ReactDOM.render(
  <A />,
  root
);