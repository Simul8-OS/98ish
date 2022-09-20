import React from "react"
import App from "../../App"
import { Rnd } from "react-rnd"
import FileExplorer from "../applets/fileExplorer/FileExplorer"
import TextEditor from "../applets/textEditor/TextEditor"
import Tetris from "../../components/applets/tetris/Tetris"
import Hover from "../../components/applets/hover/Hover"

const Desktop = ({ fs, programs, windows, dispatch }) => {
  return (
    <div>
      <div className="p-3">
        {programs &&
          programs.map((program, index) => {
            return (
              <Rnd
                default={{
                  x: 10,
                  y: index * 100 + 10,
                  width: 50,
                  height: 50,
                }}
                className="p-0 desktopIcon"
                key={index}
              >
                <div
                  className="text-center desktopIcon"
                  onDoubleClick={() =>
                    dispatch({
                      type: "open_window",
                      payload: {
                        name: program.name,
                        minimized: false,
                        maximized: false,
                      },
                    })
                  }
                >
                  <img
                    src={program.image_url}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <label className="desktopIconLabel text-light">
                    {program.name}
                  </label>
                </div>
              </Rnd>
            )
          })}
      </div>

      <div className="row desktop-row d-flex justify-content-center align-items-center pb-5">
        {/* <Rnd
          default={{
            x: 100,
            y: 100,

          }}
        >

        </Rnd> */}
        {windows &&
          windows.map((window, index) => {
            const windowStyles = ["p-0"]

            if (window.minimized) {
              windowStyles.push("d-none")
            }

            if (window.maximized) {
              windowStyles.push("vh-100")
            }
            return (
              <Rnd
                default={{
                  x: 100 + index * 100,
                  y: 100,
                }}
                className={windowStyles.join(" ")}
                key={index}
              >
                <div className="window">
                  <div className="title-bar">
                    <div className="title-bar-text">{window.name}</div>
                    <div className="title-bar-controls">
                      <button
                        aria-label="Minimize"
                        onClick={() =>
                          dispatch({
                            type: "toggle_minimize",
                            payload: {
                              name: window.name,
                              minimized: window.minimized,
                              index,
                            },
                          })
                        }
                      ></button>
                      <button
                        aria-label="Maximize"
                        onClick={() =>
                          dispatch({
                            type: "toggle_maximize",
                            payload: {
                              name: window.name,
                              maximized: window.maximized,
                              index,
                            },
                          })
                        }
                      ></button>
                      <button
                        aria-label="Close"
                        onClick={() =>
                          dispatch({
                            type: "close_window",
                            payload: { name: window.name, index },
                          })
                        }
                      ></button>
                    </div>
                  </div>
                  {window.name == "tetris" && <Tetris />}
                  {window.name == "hover" && <Hover />}
                  {window.name == "my computer" && (
                    <FileExplorer fs={fs} dispatch={dispatch} />
                  )}
                  {window.name == "Notepad" && (
                    <TextEditor file={window.file} />
                  )}
                </div>
              </Rnd>
            )
          })}
      </div>
    </div>
  )
}

export default Desktop
