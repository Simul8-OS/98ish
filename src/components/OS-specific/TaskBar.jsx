import React, { useState } from "react"
import StartMenu from "./StartMenu"
import DateAndTime from "../DateAndTime"

const TaskBar = ({ windows, dispatch }) => {
  return (
    <div
      style={{
        padding: "2px",
        boxShadow: "inset 1px 0 #fff",
        backgroundColor: "#C0C0C0",
        borderTop: "1px solid #f4f4f4",
        borderBottom: "1px solid #4e4e4e",
        zIndex: 99,
      }}
      className="row position-absolute bottom-0 w-100 align-items-center m-0"
    >
      <div className="col-auto p-0 row">
        <StartMenu windows={windows} dispatch={dispatch} />
      </div>
      <div className="col">
        {windows && windows.map((window, index) => {
        let tabStyle;

        window.active ? 
        tabStyle = {boxShadow: 'inset 1px 1px #0a0a0a, inset -1px -1px #fff, inset 2px 2px grey, inset -2px -2px #dfdfdf'} :
        tabStyle = {}
        
        return (
          <button 
            style={tabStyle}
            key={index} 
            className="desktopTab"
            onClick={() => {
              dispatch({type: 'toggle_minimize_tab', payload: {name: window.name, minimized: window.minimized, active: window.active, index}});
            }}>{window.name}</button>
        )})
        }
      </div>
      <div className="col-auto p-0">
        {/* <DateAndTime /> */}
      </div>
    </div>
  )
}

export default TaskBar
