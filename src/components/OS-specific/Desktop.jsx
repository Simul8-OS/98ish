import React from "react"
import App from "../../App"
import { Rnd } from "react-rnd"
import FileExplorer from "../applets/fileExplorer/FileExplorer"
import Tetris from "../../components/applets/tetris/Tetris"
import Hover from "../../components/applets/hover/Hover"


const Desktop = ({ fs, programs, windows, dispatch }) => {
  return (
    <div>
    {programs && programs.map((program, index) => {
      return (
        <Rnd default={{
          x: 0,
          y: index * 100,
          width: 50,
          height: 50,
        }}
        className="p-0 desktopIcon"
        key={index}>
          <div className="text-center desktopIcon" onDoubleClick={()=> {
            dispatch({type: 'open_window', payload: {name: program.name, minimized: false, maximized: false, active: true}});
            }}>

            <img 
              src={program.image_url} 
              style={{width: '50px', height: '50px'}}
            />
            <label className="desktopIconLabel">{program.name}</label>
          </div>
        </Rnd>
      )})}

      <div className="row desktop-row d-flex justify-content-center align-items-center pb-5">

      
      
      {windows && windows.map((window, index) => {
        const windowStyles = ["p-0"];
        let activeStyle;

        if (window.minimized){
          windowStyles.push("d-none")
        }

        if (window.maximized){
          windowStyles.push("vh-100")
        }

        window.active ? activeStyle = {zIndex: '111111'} : activeStyle = {}

        return(

        <Rnd default={{
            x: 100 + (index*100),
            y: 50,
            width: 600,
            height: 600
          }} 

          onClick={() => dispatch({type: 'select_active', payload: {name: window.name, active: window.active, index}})}

          className={windowStyles.join(" ")}
          key={index}
          style={activeStyle}>
          <div className="window">
            <div className="title-bar">
              <div className="title-bar-text">{window.name}</div>
              <div className="title-bar-controls">
                <button 
                  aria-label="Minimize" 
                  onClick={() => 
                    dispatch({type: 'toggle_minimize', payload: {name: window.name, minimized: window.minimized, active: window.active, index}})
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
              {window.name == "Tetris" && <Tetris />}
              {window.name == "Hover" && <Hover />}
              {window.name == "My Computer" && <FileExplorer fs={fs} />}
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
