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
        rows="31"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </div>
  )
}

export default TextEditor
