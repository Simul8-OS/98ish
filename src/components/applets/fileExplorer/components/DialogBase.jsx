import React, { useState } from "react"
import ModalContent from "./ModalContent"

const DialogBase = ({
  title,
  placeholder,
  options,
  content,
  data,
  setData,
  description,
}) => {
  const subs = {
    save: [],
    cancel: [],
  }
  const [options, setOptions] = useState({
    allowClickOut: true,
    cancelLabel: "Yes",
    submitLabel: "No",
    ...options,
  })

  const onSave = (cb) => {
    subs.save.push(cb)
  }

  const onCancel = (cb) => {
    subs.cancel.push(cb)
  }

  handleKeys = (e) => {
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
    subs.cancel.forEach((cb) => cb(data))
  }

  const handleSubmitClick = (e) => {
    e.preventDefault()
  }

  return (
    <div id="media-modal">
      <div className="window" style={{ width: 300 }}>
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
        </div>
        <div className="window-body">
          <p className="text-center">Some Text</p>
          {description && <p>{description}</p>}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {placeholder && (
            <input
              type="text"
              placeholder={placeholder}
              value={data.text || ""}
              onChange={(e) => setData({ text: e.target.value })}
              autoFocus
            />
          )}
          <div className="field-row" style={{ justifyContent: "center" }}>
            <button onClick={(e) => handleCancelClick(e)}>
              {options.cancelLabel}
            </button>
            <button onClick={(e) => handleSubmitClick(e)}>
              {options.submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
