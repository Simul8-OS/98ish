import React from "react"
import DateAndTime from "./DateAndTime"

const TaskBar = ({
  windows,
  dispatch,
  setStartMenuVisible,
  startMenuVisible,
}) => {
  const startBtnStyle = {
    cursor: "pointer",
    borderTop: startMenuVisible ? "3px solid #333" : "3px solid #eee",
    borderLeft: startMenuVisible ? "3px solid #333" : "3px solid #eee",
    borderRight: startMenuVisible ? "3px solid #eee" : "3px solid #333",
    borderBottom: startMenuVisible ? "3px solid #eee" : "3px solid #333",
  }
  return (
    <div className="taskbar row position-absolute bottom-0 w-100 align-items-center m-0">
      <div className="col-auto p-0 ps-1 taskbarLeft">
        <div
          className="d-flex px-2"
          style={startBtnStyle}
          onClick={(e) => setStartMenuVisible(!startMenuVisible)}
        >
          <img
            className="img-fluid me-2"
            style={{ width: 24 }}
            src="/assets/start98.png"
            alt="Start Menu"
          />
          <p className="mb-0 startBtn">Start</p>
        </div>
      </div>
      <div className="col taskbarRight p-0">
        {windows &&
          windows.map((window, index) => {
            let tabStyle
            window.active
              ? (tabStyle = {
                  boxShadow:
                    "inset 1px 1px #0a0a0a, inset -1px -1px #fff, inset 2px 2px grey, inset -2px -2px #dfdfdf",
                })
              : ""

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
      <div className="col-auto p-0 pe-1">
        <DateAndTime />
      </div>
    </div>
  )
}

export default TaskBar
