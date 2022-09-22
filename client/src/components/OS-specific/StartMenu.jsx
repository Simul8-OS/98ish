import React, { useState } from "react"
import { fs } from "../../utils/fs"

const StartMenu = ({ dispatch }) => {
  const handleClick = (e, type) => {
    e.preventDefault()
    switch (type) {
      case "My Computer":
        dispatch({
          type: "open_window",
          payload: {
            name: "My Computer",
            minimized: false,
            maximized: false,
            active: true,
            closed: false,
            width: 600,
            height: 400,
            positionX: 5,
            positionY: 100,
            icon_url: "/src/assets/program_icons/computer_explorer.png",
          },
        })
        return
      case "Programs":
        fs.goBackToDirectory("root")
        fs.openDirectory("C:/Programs")
        dispatch({
          type: "open_window",
          payload: {
            name: "My Computer",
            minimized: false,
            maximized: false,
            active: true,
            closed: false,
            width: 600,
            height: 400,
            positionX: 5,
            positionY: 100,
            icon_url: "/src/assets/program_icons/computer_explorer.png",
          },
        })
        return
      default:
        return
    }
  }

  const listStyle = {
    backgroundColor: "#C0C0C0",
    position: "relative",
    height: "min-content",
    fontSize: "1.2rem",
    textDecoration: "none",
    color: "#000",
    listStyle: "none",
    width: "max-content",
    bottom: "275px",
  }

  const itemStyle = {
    color: "#000",
    textDecoration: "none",
    height: "2rem",
    gap: "1rem",
  }

  const underline = {
    textDecoration: "underline",
  }

  return (
    <div>
      <ul style={listStyle} className="window p-0">
        <li className="sm-link">
          <a
            href="#"
            style={itemStyle}
            className="d-flex"
            onClick={(e) => handleClick(e, "My Computer")}
          >
            <img src="/src/assets/program_icons/computer_explorer.png" alt="" />
            <p>
              My <span style={underline}>C</span>omputer
            </p>
          </a>
        </li>
        <li className="sm-link">
          <a
            href="#"
            style={itemStyle}
            className="d-flex"
            onClick={(e) => handleClick(e, "Programs")}
          >
            <img src="/src/assets/directory_programs.ico" alt="Programs" />
            <p>
              <span style={underline}>P</span>rograms
            </p>
          </a>
        </li>
        <li>
          <form className="px-3">
            <div className="">
              <input
                type="text"
                style={{ height: "2rem" }}
                className="w-100"
                name="search"
                placeholder="Search Filesystem"
              />
            </div>
          </form>
        </li>
        <hr className="m-2 sm" />
        <li className="sm-link">
          <a
            href="#"
            style={itemStyle}
            className="d-flex"
            onClick={(e) => handleClick(e)}
          >
            <img src="/src/assets/log_off.png" alt="Log off" />
            <p>
              <span style={underline}>L</span>og Off 98ish...
            </p>
          </a>
        </li>
        <li className="sm-link">
          <a
            href="#"
            style={itemStyle}
            className="d-flex"
            onClick={(e) => handleClick(e)}
          >
            <img src="/src/assets/shut_down.png" alt="Shut Down" />
            <p>
              Sh<span style={underline}>u</span>t Down...
            </p>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default StartMenu
