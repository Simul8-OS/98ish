import React, { useState, useEffect } from "react"

const Modal = ({ reset, completeTime }) => {
  const [render, setRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setRender(true)
    }, 1000)
  }, [])

  return (
    <div
      style={{
        opacity: render ? 1 : 0,
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <div id="gameOverImage"></div>
      <div onClick={() => reset()} className="tryAgain">
        Try Again
      </div>
    </div>
  )
}

export default Modal
