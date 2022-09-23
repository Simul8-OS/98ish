import React, { useState } from "react"
import { imageMapper } from "../../../utils/imageMapper"
import { hyperlinks } from "../../../utils/hyperlinks"
import InputDialog from "./components/InputDialog"

const FileExplorer = ({ fs, dispatch }) => {
  const [dir, setDir] = useState(fs.currentDirectory.content)
  const [address, setAddress] = useState(
    `${fs.currentDirectoryPath.join("\\")}\\`.slice(5)
  )
  const [newFolder, setNewFolder] = useState(false)
  const [folderName, setFolderName] = useState("New Folder")
  const [newFile, setNewFile] = useState(false)
  const [fileName, setFileName] = useState("New File")

  const getPath = () => {
    return `${fs.currentDirectoryPath.join("\\")}\\`.slice(5)
  }

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
      case "taskmanager":
        dispatch({
          type: "open_window",
          payload: {
            name: "Task Manager",
            minimized: false,
            maximized: false,
            active: true,
            closed: false,
            width: 400,
            height: 400,
            positionX: 10,
            positionY: 0,
            icon_url: "/assets/" + imageMapper.taskmanager,
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

  const createFolder = () => {
    setNewFolder(true)
  }

  const createFile = () => {
    setNewFile(true)
  }

  const goUp = () => {
    fs.goBack()
    setDir(fs.currentDirectory.content)
    setAddress(getPath())
  }

  return (
    <div
      className="mb-0 justify-content-center align-items-center"
      style={{ height: "calc(100% - 25px)" }}
    >
      {newFolder && (
        <InputDialog
          title={"Creating a folder in this folder"}
          placeholder={folderName}
          description={"Give a name to this folder"}
          setDir={setDir}
          setNewFolder={setNewFolder}
        />
      )}
      {newFile && (
        <InputDialog
          title={"Creating a folder in this file"}
          placeholder={fileName}
          description={"Give a name to this file"}
          setDir={setDir}
          setNewFile={setNewFile}
        />
      )}
      <div className="p-1">
        <div className="field-row row">
          <div className="col-auto pe-1 d-flex align-items-center justify-content-center h-100">
            <img
              className=""
              src={"/assets/" + imageMapper.small_folder_up}
              alt=""
              onClick={() => goUp()}
            ></img>
          </div>
          <form className="col p-0 m-0">
            <input
              className="w-100"
              type="text"
              value={address ? address : "Select a Drive"}
              onChange={(e) => setAddress(e.target.value)}
            />
          </form>
          <div className="col-auto px-0">
            <button onClick={() => createFolder()}>Create Folder</button>
          </div>
          <div className="col-auto px-0">
            <button onClick={() => createFile()}>Create File</button>
          </div>
          <div className="col-auto ps-0">
            <button>
              <label htmlFor="upload-files-btn" className="">
                Upload File
                <input
                  type="file"
                  id="upload-files-btn"
                  accept="*/*"
                  multiple
                  className="d-none"
                />
              </label>
            </button>
          </div>
        </div>
      </div>
      <div
        className="bg-light overflow-scroll"
        style={{ height: "calc(100% - 32px)" }}
      >
        <div className="row row-cols-6 m-0 align-content-start pt-3">
          {dir.map((item, idx) => {
            return (
              <div key={idx} className="col p-0 text-center">
                <a
                  href="#"
                  style={{
                    color: "#000",
                    textDecoration: "none",
                  }}
                  onClick={(e) => e.preventDefault()}

                  draggable="false"
                  dragstart="false"
                >
                  <div>
                    <img
                      src={"/assets/" + imageMapper[item.type]}
                      alt=""
                      onDoubleClick={(e) => handleDoubleClick(e, item)}
                      draggable="false"
                      dragstart="false"
                    />
                    <p>{item.name}</p>
                  </div>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FileExplorer
