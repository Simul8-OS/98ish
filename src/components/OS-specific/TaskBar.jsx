import React, { useState } from "react"
import StartMenu from "./StartMenu"
import DateAndTime from "../DateAndTime"

const TaskBar = ({ windows, dispatch }) => {
  return (
    <div className="taskbar row position-absolute bottom-0 w-100 align-items-center m-0">
      <div className="col-auto p-0 taskbarLeft">
        <StartMenu windows={windows} dispatch={dispatch} />
      </div>
      <div className="col taskbarRight">
        {windows &&
          windows.map((window, index) => {
            let tabStyle
            window.active
              ? (tabStyle = {
                  boxShadow:
                    "inset 1px 1px #0a0a0a, inset -1px -1px #fff, inset 2px 2px grey, inset -2px -2px #dfdfdf",
                })
              : ""

            return (
              !window.closed && (
                <button
                  key={index}
                  style={tabStyle}
                  className="taskbarTab text-start ms-1 p-0"
                  onClick={() => {
                    dispatch({
                      type: "toggle_minimize_tab",
                      payload: {
                        name: window.name,
                        minimized: window.minimized,
                        active: window.active,
                        index,
                      },
                    })
                  }}
                >
                  <img src={window.icon_url} className="p-1 h-100" />
                  &nbsp;<span>{window.name}</span>
                </button>
              )
            )
          })}
      </div>
      <div className="col-auto p-0">{/* <DateAndTime /> */}</div>
    </div>
  )
}

export default TaskBar
