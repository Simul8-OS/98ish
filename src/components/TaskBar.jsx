import React, { useState } from "react"
import { joinable } from "joinable"
import StartMenu from "./StartMenu"
import DateAndTime from "./DateAndTime"

const TaskBar = () => {
  const [classes, setClasses] = useState(["row"])
  return (
    <div className="row align-items-between">
      <div className="col">
        <StartMenu />
      </div>
      <div className="col">{/* put open/minimized applets here */}</div>
      <div className="col">
        <DateAndTime />
      </div>
    </div>
  )
}

export default TaskBar
