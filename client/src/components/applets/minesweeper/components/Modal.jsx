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
      className="row justify-content-center align-items-center"
      style={{
        opacity: render ? 1 : 0,
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <div onClick={() => reset(true)} className="col-6 text-center">
        <button className="p-2">
          <h2 className="m-0">Try Again</h2>
        </button>
      </div>
    </div>
  )
}

export default Modal
