import React from "react"
import App from "../../App"

import Tetris from "../../components/applets/tetris/Tetris"

const Desktop = () => {
  return (
    <div>
      <fieldset>
        {/* <legend>Desktop</legend> */}
        <div className="row desktop-row d-flex justify-content-center align-items-center pb-5">
          <div className="col-10 col-md-8 col-lg-6">
            <div className="window window-sizing">
              <div className="title-bar">
                <div className="title-bar-text">Tetris for now</div>
                <div className="title-bar-controls">
                  <button aria-label="Minimize"></button>
                  <button aria-label="Maximize"></button>
                  <button aria-label="Close"></button>
                </div>
              </div>
              <div className="window-body">
                <Tetris />
              </div>
              {/* <Applet/> */}
            </div>
          </div>
        </div> </fieldset>
    </div>
  )
}

export default Desktop
