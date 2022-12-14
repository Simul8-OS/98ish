import React, { useState } from "react"
import App from "../../App"
import { Rnd } from "react-rnd"
import FileExplorer from "../applets/fileExplorer/FileExplorer"
import Notepad from "../applets/notepad/Notepad"
import Tetris from "../applets/tetris/Tetris"
import Hover from "../applets/hover/Hover"
import VideoPlayer from "../applets/videoPlayer/VideoPlayer"
import Minesweeper from "../applets/minesweeper/Minesweeper"
import ChatApp from "../applets/chatApp/ChatApp"
import TaskManager from "../applets/taskManager/TaskManager"
import io from "socket.io-client"

const Desktop = ({ fs, programs, windows, dispatch, closeMenu }) => {
  const [socket] = useState(() => io("http://localhost:8000"))
  const [share, setShare] = useState("")

  return (
    <div onClick={(e) => closeMenu()}>
      {programs &&
        programs.map((program, index) => {
          return (
            <Rnd
              default={{
                x: 10 + index * 100,
                y: 10,
                width: 50,
                height: 50,
              }}
              className="p-0 desktopIcon"
              key={index}
              enableResizing="false"
              dragGrid={[15, 15]}
              bounds="window"
            >
              <div
                className="d-flex flex-column align-items-center text-center desktopIcon"
                onDoubleClick={() => {
                  dispatch({
                    type: "open_window",
                    payload: {
                      name: program.name,
                      minimized: false,
                      maximized: false,
                      active: true,
                      closed: false,
                      width: program.width,
                      height: program.height,
                      positionX: 10,
                      positionY: 0,
                      icon_url: program.icon_url
                    },
                  })
                }}
              >
                <img
                  src={program.image_url}
                  style={{ width: "50px", height: "50px" }}
                  draggable="false"
                  dragstart="false"
                />
                <label className="desktopIconLabel text-light">
                  {program.name}
                </label>
              </div>
            </Rnd>
          )
        })}

      <div className="row desktop-row d-flex justify-content-center align-items-center pb-5">
        {windows &&
          windows.map((window, index) => {
            let windowStyles = ["p-0"]
            let activeStyle
            let maximizedStyle
            let maxButton = "Maximize"
            let resizingValue = true
            let draggingValue = false

            window.minimized ? windowStyles.push("d-none") : ""

            window.active
              ? (activeStyle = { zIndex: "111111" })
              : (activeStyle = {})

            if (window.maximized) {
              maximizedStyle = {
                height: "calc(100vh - 35px)",
                width: "calc(100vw + 4px)",
                transform: `translate(-${window.positionX}px, -${window.positionY}px)`,
              }
              maxButton = "Restore"
              resizingValue = false
              draggingValue = true
            }

            return (
              !window.closed && (
                <Rnd
                  default={{
                    x: 10 + index * 10,
                    y: window.positionY,
                    width: window.width,
                    height: window.height,
                  }}
                  enableResizing={resizingValue}
                  disableDragging={draggingValue}
                  bounds="window"
                  onDragStop={(e, data) => {
                    dispatch({
                      type: "setWindowPosition",
                      payload: {
                        name: window.name,
                        positionX: data.x - 10,
                        positionY: data.y,
                        index,
                      },
                    })
                  }}
                  onClick={() =>
                    dispatch({
                      type: "select_active",
                      payload: {
                        name: window.name,
                        active: window.active,
                        index,
                      },
                    })
                  }
                  className={windowStyles.join(" ")}
                  key={index}
                  style={activeStyle}
                >
                  <div className="window" style={maximizedStyle}>
                    <div
                      className="title-bar"
                      style={{ height: "25px" }}
                      onDoubleClick={() =>
                        dispatch({
                          type: "toggle_maximize",
                          payload: {
                            name: window.name,
                            maximized: window.maximized,
                            index,
                          },
                        })
                      }
                    >
                      <div
                        className="title-bar-text d-flex align-items-center"
                        style={{ height: "100%" }}
                      >
                        <img src={window.icon_url} className="h-100" draggable="false" dragstart="false"/>
                        &nbsp;
                        <span>{window.name}</span>
                      </div>
                      <div className="title-bar-controls h-100">
                        <button
                          className="titleBarButton"
                          aria-label="Minimize"
                          onClick={() =>
                            dispatch({
                              type: "toggle_minimize",
                              payload: {
                                name: window.name,
                                minimized: window.minimized,
                                active: window.active,
                                index,
                              },
                            })
                          }
                        ></button>
                        <button
                          className="titleBarButton"
                          aria-label={maxButton}
                          onClick={() => {
                            dispatch({
                              type: "toggle_maximize",
                              payload: {
                                name: window.name,
                                maximized: window.maximized,
                                index,
                              },
                            })
                          }}
                        ></button>
                        <button
                          className="titleBarButton"
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
                    {window.name == "Tetris" && <Tetris />}
                    {window.name == "Hover" && <Hover />}
                    {window.name == "My Computer" && (
                      <FileExplorer fs={fs} dispatch={dispatch} />
                    )}
                    {window.name == "Notepad" && <Notepad file={window.file} />}
                    {window.name == "Minesweeper" && <Minesweeper />}

                    {window.name == "YouTube '98" && (
                      <VideoPlayer socket={socket} />
                    )}
                    {window.name == "98 Messenger" && (
                      <ChatApp
                        dispatch={dispatch}
                        socket={socket}
                        setShare={setShare}
                      />
                    )}
                    {window.name == "View Video" && (
                      <iframe
                        src={share}
                        className="w-100"
                        style={{ height: "calc(100% - 25px" }}
                        allowFullScreen
                      />
                    )}
                    {window.name == "Task Manager" && (
                      <TaskManager
                        dispatch={dispatch}
                        windows={windows}
                      />
                    )}
                  </div>
                </Rnd>
              )
            )
          })}
      </div>
    </div>
  )
}

export default Desktop
