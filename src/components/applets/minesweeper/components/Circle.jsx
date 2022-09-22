import React from "react"

function Circle() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: 23,
          width: 23,
          borderRadius: 20,
          background: "rgba(0,0,0,0.4)",
        }}
      ></div>
    </div>
  )
}

export default Circle
