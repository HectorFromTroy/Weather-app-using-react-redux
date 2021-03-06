import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import WeatherMap from "./WeatherMap.jsx";
import WeatherGraphic from "./WeatherGraphic.jsx";

const RightSide = props => {
  const [ tabId, changeTab] = useState("1");

  const chooseOne = () => {
    switch (tabId){
      case "1":
        return <WeatherMap history={props.history} />

      case "2":
        return <WeatherGraphic />
    }
  };

  return (
    <div className="rightSide">
      <div className="tabSelectors" onClick={event => {
        changeTab(event.target.dataset.tabindex);
      }}>
        <button className={`tabButton tabButton_first ${tabId === "1" && "tabButton_selected"}`} 
          data-tabindex={"1"}
        >Map</button>
        <button className={`tabButton tabButton_last ${tabId === "2" && "tabButton_selected"}`} 
          data-tabindex={"2"}
        >Graphic</button>
      </div>
      {chooseOne()}
    </div>
  );
};

RightSide.propTypes = {
  history: PropTypes.object.isRequired
};

export default RightSide;