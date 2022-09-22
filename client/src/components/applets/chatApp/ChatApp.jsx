import { useState, useEffect } from "react"
import Name from "./components/Name"
import Chat from "./components/Chat"

const ChatApp = ({setShare, dispatch, socket}) => {
  const [confirmedName, setConfirmedName] = useState(null)
  return (
    <div style={{height: 'calc(100% - 25px)', overflowY: 'scroll', overflowX: 'hidden'}}>
      <h1 className="text-center pt-3">98 Messenger</h1>
      {!confirmedName && <Name setConfirmedName={setConfirmedName} />}
      {confirmedName && <Chat name={confirmedName} setShare={setShare} dispatch={dispatch} socket={socket}/>}
    </div>
  )
}

export default ChatApp