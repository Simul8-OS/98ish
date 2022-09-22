import React from "react"
import DialogBase from "./DialogBase"

const ConfirmDialog = ({ description, title = "Confirm" }) => {
  return (
    <DialogBase
      title={title}
      options={{
        cancelLabel: "Cancel",
        submitLabel: "Confirm",
      }}
      description={description}
    />
  )
}

export default ConfirmDialog
