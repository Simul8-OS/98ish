import React, { useState } from "react"
import ModalContent from "./ModalContent"
import { fs } from "../../../../utils/fs"

const DialogBase = ({
  title,
  placeholder,
  content,
  data,
  options,
  setData,
  setDir,
  setNewFolder,
  setNewFile,
  description,
}) => {
  let errorMessage = ""
  const subs = {
    save: [],
    cancel: [],
  }
  const [ops, setOps] = useState({
    allowClickOut: true,
    cancelLabel: "Yes",
    submitLabel: "No",
    ...options,
  })

  // const onSave = (cb) => {
  //   subs.save.push(cb)
  // }

  // const onCancel = (cb) => {
  //   subs.cancel.push(cb)
  // }

  const handleKeys = (e) => {
    e.preventDefault() // not 100% sure necessary
    if (e.keyCode === 27) {
      // escape
      handleCancelClick()
    } else if (e.keyCode === 13) {
      // enter
      handleSubmitClick()
    }
  }

  const handleCancelClick = (e) => {
    e.preventDefault()
    // note that cb might be changing data, so cb might need to be implemented using setData, or remove useState hook from data
    // subs.cancel.forEach((cb) => cb(data))
    if (description.includes("folder")) {
      setNewFolder(false)
    } else {
      setNewFile(false)
    }
  }

  const handleSubmitClick = (e) => {
    e.preventDefault()
    if (description.includes("folder")) {
      fs.createDirectory(data.text, "folder")
      setNewFolder(false)
    } else {
      fs.createFile(data.text, "text")
      setNewFile(false)
    }
    setDir(fs.currentDirectory.content)
  }

  return (
    <div
      id="media-modal"
      style={{
        position: "absolute",
        top: "calc(50% - 50px)",
        left: "calc(50% - 150px)",
      }}
    >
      <div className="window" style={{ width: 300 }}>
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
        </div>
        <div className="window-body">
          {/* <p className="text-center m-0">Some Text</p> */}
          {description && <p className="text-center m-0">{description}</p>}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {placeholder && (
            <input
              type="text"
              className="w-100 my-3"
              placeholder={placeholder}
              value={data.text || ""}
              onChange={(e) => setData({ text: e.target.value })}
              autoFocus
            />
          )}
          <div className="field-row" style={{ justifyContent: "center" }}>
            <button onClick={(e) => handleCancelClick(e)}>
              {ops.cancelLabel}
            </button>
            <button onClick={(e) => handleSubmitClick(e)}>
              {ops.submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DialogBase
