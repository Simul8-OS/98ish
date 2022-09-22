import React, { useState } from "react"

const DateAndTime = () => {
  const [dt, setDt] = useState(new Date())
  setInterval(() => setDt(new Date()), 1000)
  return (
    <div className="status-bar">
      <p className="mb-0 small text-end status-bar-field">
        {dt.toDateString()}{" "}
        {String(dt.getHours()).length === 1
          ? "0" + String(dt.getHours())
          : dt.getHours()}
        :{dt.getMinutes()}
      </p>
    </div>
  )
}

export default React.memo(DateAndTime)
