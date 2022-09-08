import { useState } from "react"

const DateAndTime = () => {
  const [dt, setDt] = useState(new Date())
  setInterval(() => setDt(new Date()), 1000)
  return (
    <div>
      <p className="mb-0">{dt.toDateString()}</p>
      <p>
        {dt.getHours()}:{dt.getMinutes()}:
        {String(dt.getSeconds()).length === 1
          ? "0" + String(dt.getSeconds())
          : dt.getSeconds()}
      </p>
    </div>
  )
}

export default DateAndTime
