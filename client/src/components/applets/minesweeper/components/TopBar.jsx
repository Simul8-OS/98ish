import React from "react"
import Timer from "./Timer"

export default function TopBar({ gameOver, setTime }) {
  return (
    <div
      style={{
        background: "#C0C0C0",
        padding: "10px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <span role="img" aria-label="flag" style={{ paddingBottom: 10 }}>
        🚩
      </span>
      <Timer gameOver={gameOver} sendTime={setTime} />
    </div>
  )
}
