import React, { useEffect, useState, useRef } from "react"
import io from "socket.io-client"

const Chat = ({ name }) => {
  const [socket] = useState(() => io(":8000"))
  const [msg, setMsg] = useState({
    name,
    content: "",
  })
  const [messages, setMessages] = useState([])
  const bottom = useRef(null)

  useEffect(() => {
    // we need to set up all of our event listeners
    // in the useEffect callback function
    // socket.on("welcome", (msg) => console.log(msg))
    socket.on("server_message", (msg) =>
      setMessages((prevMessages) => {
        return [...prevMessages, msg]
      })
    )
    return () => socket.disconnect(true)
  }, [])

  useEffect(() => {
    bottom.current.scrollIntoView()
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit("chat_message", msg)
    setMsg({
      name,
      content: "",
    })
  }

  return (
    
    <div className="container h-100">
      <div className="row justify-content-center"> 
          <div
            className="card border-success rounded-0"
          >
            <div className="p-3 pb-0">
              {messages.map((msg, idx) => {
                return (
                  <div
                    className={
                      msg.name == name
                        ? "d-flex flex-row-reverse"
                        : "d-flex flex-row"
                    }
                    key={idx}
                  >
                    <div
                      className={
                        msg.name == name
                          ? "mb-3 rounded-3 col-6 px-3 p-1 justify-self-end"
                          : "mb-3 rounded-3 col-6 px-3 p-1 justify-self-start"
                      }
                      style={
                        msg.name == name
                          ? {
                              backgroundColor: "dodgerblue",
                              color: "white",
                            }
                          : {
                              backgroundColor: "#eee",
                            }
                      }
                    >
                      <p className="mb-0 lead">{msg.content}</p>
                      <p className="mb-0 small text-end lead">-{msg.name}</p>
                    </div>
                  </div>
                )
              })}
              <div ref={bottom}></div>
            </div>
            <div
              style={{
                borderTop: "1px solid #198754",
                backgroundColor: "white",
              }}
              className="row position-sticky bottom-0 h-100"
            >
              <form className="col">
                <div className="row justify-content-between p-3">
                  <div className="col-10">
                    <input
                      className="form-control-lg w-100"
                      type="text"
                      placeholder="message"
                      value={msg.content}
                      onChange={(e) =>
                        setMsg({
                          name: name,
                          content: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => sendMessage(e)}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Chat