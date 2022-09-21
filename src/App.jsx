import React, { useState, useReducer, useContext } from "react"
import { Html, softShadows, OrbitControls } from "@react-three/drei"
import { Canvas, extend } from "@react-three/fiber"
import TaskBar from "./components/OS-specific/TaskBar"
import Desktop from "./components/OS-specific/Desktop"
import { fs } from "./utils/fs"
import { programs } from "./utils/programs"
import ContextMenu from "./components/applets/fileExplorer/components/ContextMenu"
import { contextMenus } from "./utils/contextMenus"

const reducer = (state, action) => {
  switch (action.type) {
    case "open_window":
      console.log(action.payload.name)
      return [
        ...state.map((window, idx) => {
          return { ...window, active: false }
        }),
        { ...action.payload },
      ]

    case "close_window":
      return state.map((window, idx) => {
        if (idx === action.payload.index) {
          return { ...window, closed: true }
        }
        return window
      })
    // return state.filter((_, idx) => idx !== action.payload.index)

    case "toggle_minimize_tab":
      return state.map((window, idx) => {
        if (idx === action.payload.index) {
          if (action.payload.minimized === true)
            return { ...window, minimized: !window.minimized, active: true }
          else if (action.payload.minimized === false) {
            if (action.payload.active === false)
              return { ...window, minimized: false, active: true }
            else if (action.payload.active === true)
              return { ...window, minimized: !window.minimized, active: false }
          }
        }
        return { ...window, active: false }
      })

    case "toggle_minimize":
      return state.map((window, idx) => {
        if (idx === action.payload.index) {
          return { ...window, minimized: !window.minimized, active: false }
        }
        return { ...window, active: false }
      })

    case "toggle_maximize":
      return state.map((window, idx) => {
        if (idx === action.payload.index) {
          return { ...window, maximized: !window.maximized }
        }
        return window
      })

    case "select_active":
      return state.map((window, idx) => {
        if (idx === action.payload.index) {
          if (window.minimized == true) return { ...window, active: false }
          else if (window.minimized == false) return { ...window, active: true }
        }
        return { ...window, active: false }
      })

    case "setWindowPosition":
      return state.map((window, idx) => {
        if (idx === action.payload.index) {
          return {
            ...window,
            positionX: action.payload.positionX,
            positionY: action.payload.positionY,
          }
        }
        return window
      })

    // case "reset_position":
    //   return state.map((window, idx) => {
    //     if (idx === action.payload.index) {
    //       alert("hit")
    //       return {...window, reset: true}
    //     }
    //     return window
    //   })

    default:
      return state
  }
}

function App() {
  const [gameData, setGameData] = useState({})
  const [windows, dispatch] = useReducer(reducer, [])

  return (
    <>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 75 }}>
        <Html fullscreen>
          {/* <ContextMenu menu={contextMenus.Desktop} /> */}
          <Desktop
            fs={fs}
            programs={programs}
            windows={windows}
            dispatch={dispatch}
            gameData={gameData}
            setGameData={setGameData}
          />
          <TaskBar windows={windows} dispatch={dispatch} />
        </Html>
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 20, 0]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={40}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />
        <pointLight position={[-5, 2, 10]} intensity={1} />
        <group>
          <mesh rotation={[0, -0.4, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color={"#008284"} />
          </mesh>
        </group>
      </Canvas>
    </>
  )
}

export default App
