import { useState, useEffect } from "react"
import Name from "./components/Name"
import Chat from "./components/Chat"

const ChatApp = () => {
  const [confirmedName, setConfirmedName] = useState(null)
  return (
    <div>
      <h1 className="text-center">98 Messenger</h1>
      {!confirmedName && <Name setConfirmedName={setConfirmedName} />}
      {confirmedName && <Chat name={confirmedName} />}
    </div>
  )
}

export default ChatApp