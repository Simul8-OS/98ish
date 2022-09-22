import React from "react"
import { mineColor } from "../utils/mineColor"
import Circle from "./Circle"

const Cell = ({ data, flagCell, updateBoard }) => {
  const style = {
    block: {
      width: 40,
      height: 40,
      color: numColorCode(data.value),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: 800,
      fontSize: 30,
      cursor: "pointer",
      background: data.revealed
        ? data.value === "X"
          ? mineColor()
          : bombChexPattern(data.x, data.y)
        : chexPattern(data.x, data.y),
      borderTop: data.revealed ? "0" : "4px solid #eee",
      borderLeft: data.revealed ? "0" : "4px solid #eee",
      borderBottom: data.revealed ? "0" : "4px solid #555",
      borderRight: data.revealed ? "0" : "4px solid #555",
    },
  }

  const onClickUpdate = (e) => {
    if (data.flagged) {
      return
    }
    console.log(e.type)
    updateBoard(data.x, data.y)
  }

  const onClickFlag = (e) => {
    e.preventDefault()
    flagCell(data.x, data.y)
  }

  return (
    <div
      onClick={(e) => onClickUpdate(e)}
      onContextMenu={(e) => onClickFlag(e)}
      style={style.block}
    >
      {data.flagged && !data.revealed ? (
        "🚩"
      ) : data.revealed && data.value !== 0 ? (
        data.value === "X" ? (
          <Circle />
        ) : (
          data.value
        )
      ) : (
        ""
      )}
    </div>
  )
}

const chexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#C0C0C0"
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#C0C0C0"
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#C0C0C0"
  } else {
    return "#C0C0C0"
  }
}

const bombChexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#C0C0C0"
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#ddd"
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#ddd"
  } else {
    return "#C0C0C0"
  }
}

const numColorCode = (num) => {
  if (num === 1) {
    return "#1976d2"
  } else if (num === 2) {
    return "#388d3c"
  } else if (num === 3) {
    return "#d33030"
  } else if (num === 4) {
    return "#7c21a2"
  } else if (num === 5) {
    return "#1976d2"
  } else if (num === 6) {
    return "#1976d2"
  } else {
    return "white"
  }
}

export default Cell
