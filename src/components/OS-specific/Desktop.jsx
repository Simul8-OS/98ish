import React from "react"
import App from "../../App"
import { Rnd } from "react-rnd";
import FileExplorer from "../applets/fileExplorer/FileExplorer"
import Tetris from "../../components/applets/tetris/Tetris"
import Hover from "../../components/applets/hover/Hover"

const Desktop = ({ fs, programs, windows, dispatch }) => {

  // fs.printCurrentDirectory()

  //example
  // const handleClick = (e) => {
  //   dispatch({
  //     type: "minimize",
  //     payload: {
  //       name: "tetris",
  //     },
  //   })
  // }

  // const handleClick = (e) => {
  //   dispatch({
  //     type: "close_window",
  //     payload: {
  //       name: "tetris",
  //     },
  //   })
  // }
  return (
//    <div className="">
//      {/* Windows */}
//      <div
//        className="row row-cols-2 ps-3 position-absolute w-100 h-100 justify-content-center align-items-center"
//        style={{ zIndex: 99 }}
//      >
//        {windows &&
//          windows.map((win, idx) => {
//            return (
//              <div key={idx} className="col">
//                <div className="window">
//                  <div className="title-bar">
//                    <div className="title-bar-text">{win.name}</div>
//                    <div className="title-bar-controls">
//                      <button aria-label="Minimize"></button>
//                      <button aria-label="Maximize"></button>
//                      <button aria-label="Close"></button>
//                    </div>
//                  </div>
//                  {win.name === "Tetris" && <Tetris />}
//                  {win.name === "File Explorer" && <FileExplorer />}
//                </div>
//              </div>
//            )
//          })}
//      </div>
    <div>
    {programs && programs.map((program, index) => {
      return (
        <Rnd default={{
          x: 0,
          y: index * 100,
          width: 50,
          height: 50
        }}
        className="p-0 desktopIcon"
        key={index}>
          <figure className="text-center desktopIcon" onDoubleClick={()=> 
            dispatch({type: 'open_window', payload: {name: program.name, minimized: false, maximized: false}})}>
            <img 
              src={program.image_url} 
              style={{width: '50px', height: '50px'}}
            />
            <p>{program.name}</p>
          </figure>
        </Rnd>
      )})}

      <div className="row desktop-row d-flex justify-content-center align-items-center pb-5">
      
      {windows && windows.map((window, index) => {
        const windowStyles = ["p-0"];

        if (window.minimized){
          windowStyles.push("d-none")
        }

        if (window.maximized){
          windowStyles.push("vh-100")
        }
        return(

        <Rnd default={{
            x: 100 + (index*100),
            y: 100,
            width: 600,
            height: 600,
          }} 

          className={windowStyles.join(" ")}
          key={index}>
          <div className="window window-sizing">
            <div className="title-bar">
              <div className="title-bar-text">{window.name}</div>
              <div className="title-bar-controls">
                <button 
                  aria-label="Minimize" 
                  onClick={() => 
                    dispatch({type: 'toggle_minimize', payload: {name: window.name, minimized: window.minimized, index}})
                  }>
                </button>
                <button 
                  aria-label="Maximize" 
                  onClick={() => 
                    dispatch({type: 'toggle_maximize', payload: {name: window.name, maximized: window.maximized, index}})
                  }>
                </button>
                <button 
                  aria-label="Close" 
                  onClick={() => 
                  dispatch({type: 'close_window', payload: {name: window.name, index}})
                  }>
                </button>
              </div>
            </div>
            <div className="window-body">
              {window.name == "tetris" && <Tetris />}
              {window.name == "hover" && <Hover />}
            </div>
          </div>
        </Rnd>
        )
        })}
      </div> 
    </div>
  )
}

export default Desktop
