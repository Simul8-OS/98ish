import React from "react"
import { useEffect, useState } from "react"
import createBoard from "../utils/createBoard"

const Board = () => {
  const [grid, setgrid] = useState([])

  useEffect(() => {
    function freshBoard() {
      const newBoard = createBoard(5, 5, 10)
      setgrid(newBoard)
    }
    freshBoard()
  }, [])

  return grid.map((singleRow) => {
    return (
      <div style={{ display: "flex" }}>
        {singleRow.map((cell) => {
          return (
            <div
              style={{
                width: 30,
                height: 30,
                borderRight: "3px solid #555",
                borderBottom: "3px solid #555",
                borderLeft: "2px solid #eee",
                borderTop: "2px solid #eee",
              }}
              className="text-center align-items-center justify-content-center"
            >
              {cell.value}
            </div>
          )
        })}
      </div>
    )
  })
}

export default Board
