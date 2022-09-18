import React, { useState } from "react"
import DialogBase from "./DialogBase"

const InputDialog = ({ title, placeholder }) => {
  const [data, setData] = useState({ text: "" })

  return (
    <DialogBase
      title={title}
      placeholder={placeholder}
      data={data}
      setData={setData}
      options={{ cancelLabel: "Cancel", submitLabel: "Save" }}
    />
  )
}

export default InputDialog
