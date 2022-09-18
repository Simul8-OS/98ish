import React from "react"
import FileExplorer from "../applets/fileExplorer/FileExplorer"

const Desktop = ({ fs }) => {
  // console.log(windows)

  const windows = [
    {
      name: "File Explorer",
      minimized: false,
    },
    {
      name: "Tetris",
      minimized: false,
    },
    {
      name: "Notepad",
      minimized: false,
    },
  ]
  // fs.printCurrentDirectory()

  //example
  // const handleClick = (e) => {
  //   dispatch({
  //     type: "minimize",
  //     payload: {
  //       name: "tetris",
  //     },
  //   })
  // }

  // const handleClick = (e) => {
  //   dispatch({
  //     type: "close_window",
  //     payload: {
  //       name: "tetris",
  //     },
  //   })
  // }
  return (
    <div className="">
      {/* Windows */}
      <div
        className="row row-cols-2 ps-3 position-absolute w-100 h-100 justify-content-center align-items-center"
        style={{ zIndex: 99 }}
      >
        {windows &&
          windows.map((win, idx) => {
            return (
              <div key={idx} className="col">
                <div className="window">
                  <div className="title-bar">
                    <div className="title-bar-text">{win.name}</div>
                    <div className="title-bar-controls">
                      <button aria-label="Minimize"></button>
                      <button aria-label="Maximize"></button>
                      <button aria-label="Close"></button>
                    </div>
                  </div>
                  {win.name === "Tetris" && <Tetris />}
                  {win.name === "File Explorer" && <FileExplorer />}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Desktop
