import React, { useEffect, useState } from "react"
import { imageMapper } from "../../../utils/imageMapper"
import ContextMenu from "./components/ContextMenu"
import { contextMenus } from "../../../utils/contextMenus"
import { hyperlinks } from "../../../utils/hyperlinks"

const FileExplorer = ({ fs, dispatch }) => {
  const [dir, setDir] = useState(fs.currentDirectory.content)
  const [address, setAddress] = useState(
    `${fs.currentDirectoryPath.join("\\")}\\`.slice(5)
  )
  const [folderName, setFolderName] = useState("New Folder")

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
          },
        })
        return
      case "internet":
        window.open(hyperlinks[item.name])
      default:
        return
    }
  }

  const createFolder = () => {
    fs.createDirectory("", "folder")
    setDir(fs.currentDirectory.content)
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
      <div className="p-1">
        <div className="field-row row">
          <div className="col-auto pe-1 d-flex align-items-center justify-content-center h-100">
            <img
              className=""
              src={"/src/assets/" + imageMapper.small_folder_up}
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
            <button id="create-folder-btn" onClick={() => createFolder()}>
              Create Folder
            </button>
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
                >
                  <div>
                    <img
                      src={"/src/assets/" + imageMapper[item.type]}
                      alt=""
                      onDoubleClick={(e) => handleDoubleClick(e, item)}
                    />
                    {item.name === "un-named directory" ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          fs.renameItem("un-named directory", folderName)
                        }}
                      >
                        <input
                          className="text-center"
                          style={{
                            boxShadow: "none",
                            backgroundColor: "#F8F9FA",
                          }}
                          type="text"
                          value={folderName}
                          autoFocus
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => setFolderName(e.target.value)}
                        />
                        <input type="submit" style={{ display: "none" }} />
                      </form>
                    ) : (
                      <p>{item.name}</p>
                    )}
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
