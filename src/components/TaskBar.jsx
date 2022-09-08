import React, { useState } from "react"
import { joinable } from "joinable"
import StartMenu from "./StartMenu"
import DateAndTime from "./DateAndTime"

const TaskBar = () => {
  const [classes, setClasses] = useState(["row"])
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
        <StartMenu />
      </div>
      <div className="col">{/* put open/minimized applets here */}</div>
      <div className="col-auto p-0">
        <DateAndTime />
      </div>
    </div>
  )
}

export default TaskBar
