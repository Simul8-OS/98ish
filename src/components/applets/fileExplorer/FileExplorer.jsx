import React, { useEffect, useState } from "react"
import { imageMapper } from "../../../utils/imageMapper"

const FileExplorer = ({ fs }) => {
  const [dir, setDir] = useState(fs.currentDirectory.content)

  const handleDoubleClick = (e, item) => {
    console.log("DoubleClick")
    fs.openDirectory(item.name)
    setDir(fs.currentDirectory.content)
  }

  const goUp = () => {
    fs.goBack()
    setDir(fs.currentDirectory.content)
  }

  return (
    <div className="mb-0">
      <div className="p-1">
        <fieldset>
          <div className="field-row">
            <div className="">
              <button className="w-100" onClick={() => goUp()}>
                <img
                  src={"/src/assets/" + imageMapper.small_folder_up}
                  alt=""
                ></img>
              </button>
            </div>
            <div>
              <button id="create-folder-btn">Create Folder</button>
            </div>
            <div>
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
        </fieldset>
      </div>
      <div className="bg-light row row-cols-6 m-0" style={{ minHeight: 300 }}>
        {dir.map((item, idx) => {
          return (
            <div key={idx} className="col p-0 text-center">
              <img
                src={"/src/assets/" + imageMapper[item.type]}
                alt=""
                onDoubleClick={(e) => handleDoubleClick(e, item)}
              />
              <p>{item.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FileExplorer
