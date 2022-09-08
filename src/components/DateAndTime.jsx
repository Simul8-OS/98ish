import { useState } from "react"

const DateAndTime = () => {
  const [dt, setDt] = useState(new Date())
  setInterval(() => setDt(new Date()), 1000)
  return (
    <div className="status-bar">
      <p className="mb-0 small text-end status-bar-field">
        {dt.toDateString()} {dt.getHours()}:{dt.getMinutes()}:
        {String(dt.getSeconds()).length === 1
          ? "0" + String(dt.getSeconds())
          : dt.getSeconds()}
      </p>
    </div>
  )
}

export default DateAndTime
