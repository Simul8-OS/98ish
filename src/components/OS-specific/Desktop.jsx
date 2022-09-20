import React from "react"
import App from "../../App"
import { Rnd } from "react-rnd"
import FileExplorer from "../applets/fileExplorer/FileExplorer"
import TextEditor from "../applets/textEditor/TextEditor"
import Tetris from "../../components/applets/tetris/Tetris"
import Hover from "../../components/applets/hover/Hover"


const Desktop = ({ fs, programs, windows, dispatch }) => {
  return (
    <div>
    {programs && programs.map((program, index) => {
      return (
        <Rnd default={{
          x: 10,
          y: 10+ index * 100,
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
            <label className="desktopIconLabel text-light">{program.name}</label>
          </div>
        </Rnd>
      )})}

      <div className="row desktop-row d-flex justify-content-center align-items-center pb-5">

      
      
      {windows && windows.map((window, index) => {
        let windowStyles = ["p-0"];
        let activeStyle;
        let maximizedStyle;
        let maxButton = "Maximize"

        window.minimized ? windowStyles.push("d-none") : ""

        window.active ? activeStyle = {zIndex: '111111'} : activeStyle = {}

        if (window.maximized){
          maximizedStyle = {position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw'}
          maxButton = "Restore"
        }

        return(

        <Rnd default={{
            x: 10,
            y: 0,
            width: 600,
            height: 600
          }} 

          onClick={() => dispatch({type: 'select_active', payload: {name: window.name, active: window.active, index}})}

          className={windowStyles.join(" ")}
          key={index}
          style={activeStyle}>
          <div className="window" style={maximizedStyle}>
            <div className="title-bar" style={{height: '25px'}}>
              <div className="title-bar-text d-flex align-items-center" style={{height: '100%'}}>
                <img src="/src/assets/program_icons/tetris.png" className="taskbarIcon"/>&nbsp;
                <span>{window.name}</span>
              </div>
              <div className="title-bar-controls h-100">
                <button 
                  className="titleBarButton"
                  aria-label="Minimize" 
                  onClick={() => 
                    dispatch({type: 'toggle_minimize', payload: {name: window.name, minimized: window.minimized, active: window.active, index}})
                  }>
                </button>
                <button 
                  className="titleBarButton"
                  aria-label={maxButton}
                  onClick={() => 
                    dispatch({type: 'toggle_maximize', payload: {name: window.name, maximized: window.maximized, index}})
                  }>
                </button>
                <button 
                  className="titleBarButton"
                  aria-label="Close" 
                  onClick={() => 
                  dispatch({type: 'close_window', payload: {name: window.name, index}})
                  }>
                </button>
              </div>
            </div>
           
            {window.name == "Tetris" && <Tetris />}
            {window.name == "Hover" && <Hover />}
            {window.name == "My Computer" && <FileExplorer fs={fs} dispatch={dispatch} />}
            {window.name == "Notepad" && (<TextEditor file={window.file} />)}
          </div>
        </Rnd>
        )
        })}
      </div>
    </div>
  )
}

export default Desktop
