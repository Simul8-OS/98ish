import React from "react"
import App from "../../App"
import { Rnd } from "react-rnd"
import FileExplorer from "../applets/fileExplorer/FileExplorer"
import Tetris from "../../components/applets/tetris/Tetris"

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
    //    <div className="">
    //      {/* Windows */}
    //      <div
    //        className="row row-cols-2 ps-3 position-absolute w-100 h-100 justify-content-center align-items-center"
    //        style={{ zIndex: 99 }}
    //      >
    //        {windows &&
    //          windows.map((win, idx) => {
    //            return (
    //              <div key={idx} className="col">
    //                <div className="window">
    //                  <div className="title-bar">
    //                    <div className="title-bar-text">{win.name}</div>
    //                    <div className="title-bar-controls">
    //                      <button aria-label="Minimize"></button>
    //                      <button aria-label="Maximize"></button>
    //                      <button aria-label="Close"></button>
    //                    </div>
    //                  </div>
    //                  {win.name === "Tetris" && <Tetris />}
    //                  {win.name === "File Explorer" && <FileExplorer />}
    //                </div>
    //              </div>
    //            )
    //          })}
    //      </div>
    <div>
      <fieldset>
        {/* <legend>Desktop</legend> */}
        <div className="row desktop-row d-flex justify-content-center align-items-center pb-5">
          <Rnd
            default={{
              x: 0,
              y: 0,
              width: 600,
              height: 600,
            }}
            className="p-0"
          >
            <div className="window window-sizing">
              <div className="title-bar">
                <div className="title-bar-text">Tetris for now</div>
                <div className="title-bar-controls">
                  <button aria-label="Minimize"></button>
                  <button aria-label="Maximize"></button>
                  <button aria-label="Close"></button>
                </div>
              </div>
              {/* <div className="window-body">
                <Tetris />
              </div> */}
              <FileExplorer fs={fs} />
            </div>
          </Rnd>
        </div>{" "}
      </fieldset>
    </div>
  )
}

export default Desktop
