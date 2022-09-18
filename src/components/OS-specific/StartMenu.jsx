import React from "react"

const StartMenu = ({ windows, dispatch }) => {
  const handleClick = (e) => {
    e.preventDefault()
    dispatch({
      type: "open_window",
      payload: {
        name: "Explorer",
        minimized: false,
      },
    })
  }

  const style = {
    backgroundColor: "#C0C0C0",
  }

  return (
    <div className="dropup">
      <img
        className="dropdown-toggle"
        data-bs-toggle="dropdown"
        src="./src/assets/start.png"
        alt=""
      />
      <ul style={style} className="dropdown-menu rounded-0 window p-3">
        <li>Item</li>
        <li>
          <a href="#" onClick={(e) => handleClick(e)}>
            File Explorer
          </a>
        </li>
        <li>Programs</li>
        <li>
          <form className="dropdown-item">
            <div className="form-floating">
              <input
                type="text"
                className=""
                name="search"
                placeholder="search"
              />
            </div>
          </form>
        </li>
        <li>Log Off...</li>
        <li>Shut Down...</li>
      </ul>
    </div>
  )
}

export default StartMenu
