import React, { useState } from "react"

const TextEditor = ({ file }) => {
  const [text, setText] = useState(file.textContent)

  return (
    <div>
      <textarea cols="80" rows="20" defaultValue={text}></textarea>
    </div>
  )
}

export default TextEditor
