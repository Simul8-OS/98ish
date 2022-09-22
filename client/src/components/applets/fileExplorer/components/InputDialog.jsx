import React, { useState } from "react"
import DialogBase from "./DialogBase"

const InputDialog = ({
  title,
  placeholder,
  description,
  setDir,
  setNewFolder,
  setNewFile,
}) => {
  const [data, setData] = useState({ text: "" })

  return (
    <div className="position-static">
      <DialogBase
        title={title}
        placeholder={placeholder}
        description={description}
        data={data}
        setData={setData}
        setDir={setDir}
        setNewFolder={setNewFolder}
        setNewFile={setNewFile}
        options={{ cancelLabel: "Cancel", submitLabel: "Save" }}
      />
    </div>
  )
}

export default InputDialog
