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
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p className="mb-0 ms-3 h4">Flag 20 Bombs. Be Careful!</p>
      <Timer gameOver={gameOver} sendTime={setTime} />
    </div>
  )
}
