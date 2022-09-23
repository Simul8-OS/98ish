import React from "react"
import { imageMapper } from "../../utils/imageMapper"
import { hyperlinks } from "../../utils/hyperlinks"

const LiveSearch = ({ results, dispatch }) => {
  const handleDoubleClick = (e, item) => {
    switch (item.type) {
      case "bookmarks":
        fs.openDirectory(item.name)
        setDir(fs.currentDirectory.content)
        setAddress(getPath())
        return
      case "documents":
        fs.openDirectory(item.name)
        setDir(fs.currentDirectory.content)
        setAddress(getPath())
        return
      case "drive":
        fs.openDirectory(item.name)
        setDir(fs.currentDirectory.content)
        setAddress(getPath())
        return
      case "folder":
        fs.openDirectory(item.name)
        setDir(fs.currentDirectory.content)
        setAddress(getPath())
        return
      case "text":
        dispatch({
          type: "open_window",
          payload: {
            name: "Notepad",
            file: item,
            minimized: false,
            maximized: false,
            active: true,
            closed: false,
            width: 400,
            height: 400,
            positionX: 10,
            positionY: 0,
            icon_url: "/assets/" + imageMapper.notepad,
          },
        })
        return
      case "note":
        dispatch({
          type: "open_window",
          payload: {
            name: "Notepad",
            file: item,
            minimized: false,
            maximized: false,
            active: true,
            closed: false,
            width: 400,
            height: 400,
            positionX: 10,
            positionY: 0,
            icon_url: "/assets/" + imageMapper.notepad,
          },
        })
        return
      case "internet":
        window.open(hyperlinks[item.name])
        return
      case "tetris":
        dispatch({
          type: "open_window",
          payload: {
            name: "Tetris",
            minimized: false,
            maximized: false,
            active: true,
            closed: false,
            width: 600,
            height: 600,
            positionX: 10,
            positionY: 0,
            icon_url: "/assets/" + imageMapper.tetris,
          },
        })
        return
      case "terminal":
        dispatch({
          type: "open_window",
          payload: {
            name: "Terminal",
            minimized: false,
            maximized: false,
            active: true,
            closed: false,
            width: 200,
            height: 200,
            positionX: 10,
            positionY: 0,
            icon_url: "/assets/" + imageMapper.terminal,
          },
        })
        return
      case "hover":
        dispatch({
          type: "open_window",
          payload: {
            name: "Hover",
            minimized: false,
            maximized: false,
            active: true,
            closed: false,
            width: 600,
            height: 600,
            positionX: 10,
            positionY: 0,
            icon_url: "/assets/" + imageMapper.hover,
          },
        })
        return
      case "video":
        dispatch({
          type: "open_window",
          payload: {
            name: "YouTube '98",
            minimized: false,
            maximized: false,
            active: true,
            closed: false,
            width: 600,
            height: 600,
            positionX: 10,
            positionY: 0,
            icon_url: "/assets/" + imageMapper.video,
          },
        })
        return
      case "notepad":
        dispatch({
          type: "open_window",
          payload: {
            name: "Notepad",
            minimized: false,
            maximized: false,
            active: true,
            closed: false,
            width: 400,
            height: 400,
            positionX: 10,
            positionY: 0,
            icon_url: "/assets/" + imageMapper.notepad,
          },
        })
        return
      case "minesweeper":
        dispatch({
          type: "open_window",
          payload: {
            name: "Minesweeper",
            minimized: false,
            maximized: false,
            active: true,
            closed: false,
            width: 373,
            height: 456,
            positionX: 10,
            positionY: 0,
            icon_url: "/assets/" + imageMapper.minesweeper,
          },
        })
        return
      case "chat":
        dispatch({
          type: "open_window",
          payload: {
            name: "98 Messenger",
            minimized: false,
            maximized: false,
            active: true,
            closed: false,
            width: 600,
            height: 400,
            positionX: 10,
            positionY: 0,
            icon_url: "/assets/" + imageMapper.chat,
          },
        })
        return
      default:
        return
    }
  }
  return (
    <div
      className="window"
      style={{
        position: "fixed",
        top: "100px",
        right: "150px",
        height: "fit-content",
      }}
    >
      <div
        className="bg-light overflow-scroll"
        style={{ height: "calc(100% - 32px)" }}
      >
        <div className="row row-cols-6 m-0 align-content-start pt-3">
          {results.map((item, idx) => {
            return (
              <div key={idx} className="col p-0 text-center">
                <a
                  href="#"
                  style={{
                    color: "#000",
                    textDecoration: "none",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  <div>
                    <img
                      src={"/assets/" + imageMapper[item.type]}
                      alt=""
                      onDoubleClick={(e) => handleDoubleClick(e, item)}
                    />
                    <p>{item.name}</p>
                  </div>
                </a>
              </div>
            )
          })}
        </div>
      </div>
      {/* {results &&
        results.map((result, idx) => {
          return <p>{result.name}</p>
        })} */}
    </div>
  )
}

export default LiveSearch
