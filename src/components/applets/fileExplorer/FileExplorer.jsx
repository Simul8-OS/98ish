import React, { useState } from "react"
import "../../../utils/imageMapper"

const FileExplorer = () => {
  return (
    <div id="media-container">
      <h3>My Computer</h3>
      <div className="media-controls">
        <div>
          <button id="go-back-btn">Back</button>
          <div className="d-flex" id="breadcrumbs"></div>
        </div>
        <div>
          <button id="create-folder-btn">Create Folder</button>
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
        </div>
      </div>
      <div id="container-wrapper">
        <div className="directories">
          <h4>Directories</h4>
        </div>
        <div className="files">
          <h4>Files</h4>
        </div>
        {/* <p className="directory-blank">Empty Directory</p> */}
      </div>
    </div>
  )
}

export default FileExplorer
