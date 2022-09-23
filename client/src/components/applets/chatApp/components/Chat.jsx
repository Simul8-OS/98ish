import React, { useEffect, useState, useRef } from "react"

const Chat = ({ name, setShare, dispatch, socket }) => {
  const [msg, setMsg] = useState({
    name,
    content: "",
    type: ""
  })
  const [messages, setMessages] = useState([])
  const bottom = useRef(null)

  useEffect(() => {
    socket.on("server_message", (msg) =>
      setMessages((prevMessages) => {
        return [...prevMessages, msg]
      })
    )
  }, [])

  useEffect(() => {
    bottom.current.scrollIntoView()
  }, [messages])
  
  const sendMessage = (e) => {
    e.preventDefault()

    if (msg.content.length == 0)
      return

    socket.emit("chat_message", msg)

    setMsg({
      name,
      content: "",
      type: ""
    })
  }

  return (
    
    <div className="container" style={{height: 'calc(100%-1rem)'}}>
      <div className="row justify-content-center"> 
          <div
            className="card rounded-0"
          >
            <div className="pb-0">
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
                          ? "my-2 rounded-3 col-6 px-3 p-1 justify-self-end"
                          : "my-2 rounded-3 col-6 px-3 p-1 justify-self-start"
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
                      <p 
                        className={
                          msg.type =='share'
                            ? "mb-0 lead highlightedLink" 
                            : "mb-0 lead"
                        }
                        
                        style={
                          msg.type=='share' 
                            ? {
                                color: 'blue'
                              }
                            :
                              {}
                        }

                        onClick={
                          () => {
                            if (msg.type == "share"){
                              setShare(msg.content)
                              dispatch({
                                type: "open_window",
                                payload: {
                                  name: "View Video",
                                  minimized: false,
                                  maximized: false,
                                  active: true,
                                  closed: false,
                                  width: 768,
                                  height: 432,
                                  positionX: 10,
                                  positionY: 0,
                                  icon_url: '/assets/program_icons/video.png',
                                },
                              })
                            }
                          }
                        }
                      >{msg.content}</p>
                      <p className="mb-0 small text-end lead">-{msg.name}</p>
                    </div>
                  </div>
                )
              })}
              <div ref={bottom}></div>
            </div>
            <div
              style={{
                backgroundColor: "grey",
              }}
              className="row position-sticky bottom-0 h-100"
            >
              <form className="col">
                <div className="row justify-content-between p-3 align-items-center">
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
                          type: "chat"
                        })
                      }
                    />
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-primary w-100"
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