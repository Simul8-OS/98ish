import React, { useState } from "react"

const TextEditor = ({ currentFile, text, setText }) => {
  return (
    <div className="h-100">
      <div className="p-1">
        <p className="m-0" style={{ fontWeight: "bold" }}>
          {currentFile.name}.txt
        </p>
      </div>
      <textarea
        style={{ width: "100%" }}
        rows="19"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      {/* <p>{text}</p>
      <input
        type="text"
        className="d-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      /> */}
    </div>
  )
}

export default TextEditor
