import React from "react"
import App from "../../App"

const Desktop = () => {
  return (
    <div>
      <fieldset>
        {/* <legend>Desktop</legend> */}
        <div className="row">
          <div className="col-4">
            <div className="window">
              <div className="title-bar">
                <div className="title-bar-text">A Window With Stuff In It</div>
                <div className="title-bar-controls">
                  <button aria-label="Minimize"></button>
                  <button aria-label="Maximize"></button>
                  <button aria-label="Close"></button>
                </div>
              </div>
              <Applet/>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default Desktop
