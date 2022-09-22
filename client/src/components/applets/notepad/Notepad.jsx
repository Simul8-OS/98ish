import React, { useState } from "react"
import { fs } from "../../../utils/fs"
import TextEditor from "./components/TextEditor"

const Notepad = ({ file }) => {
  const [text, setText] = useState(file ? file.textContent : "")
  const [fileName, setFileName] = useState(file ? file.name : "")
  const [isNewFile, setIsNewFile] = useState(false)
  const [currentFile, setCurrentFile] = useState(file ? file : {})

  const newFile = () => {
    setText("")
    setCurrentFile({ name: "file", type: "text", textContent: "" })
    setIsNewFile(true)
  }

  const openFile = () => {}

  const saveFile = () => {
    console.log("attempting to save file...")
    if (file && !isNewFile) {
      console.log("there is a file")
      if (fs.getItem(currentFile.name).textContent !== text) {
        fs.getItem(currentFile.name).textContent = text
      }
      if (fs.getItem(currentFile.name).name !== fileName) {
        fs.getItem(currentFile.name).name = fileName
      }
    } else {
      fs.createFile(fileName, "text", text)
    }
    // setCurrentFile(fs.getItem(fileName))
  }

  return (
    <div>
      <div className="fieldrow">
        <button onClick={newFile}>New</button>
        <button onClick={openFile}>Open</button>
        <button onClick={saveFile}>Save</button>
        <input
          type="text"
          onChange={(e) => setFileName(e.target.value)}
          value={fileName}
        />
      </div>
      {currentFile && (
        <TextEditor
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          text={text}
          setText={setText}
        />
      )}
    </div>
  )
}

export default Notepad
