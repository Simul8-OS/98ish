import React, { useState, useReducer } from "react"
import { Html } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import TaskBar from "./components/OS-specific/TaskBar"
import StartMenu from "./components/OS-specific/StartMenu"
import Desktop from "./components/OS-specific/Desktop"
import { fs } from "./utils/fs"
import { programs } from "./utils/programs"

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

      case "end_all":
        return state.map((window, idx) => {
          if (window.name != "Task Manager"){
            return { ...window, closed: true }
          }
          return window
        })

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
    default:
      return state
  }
}

function App() {
  const [windows, dispatch] = useReducer(reducer, [])
  const [startMenuVisible, setStartMenuVisible] = useState(false)

  return (
    <>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 75 }}>
        <Html fullscreen>
          <Desktop
            fs={fs}
            programs={programs}
            windows={windows}
            dispatch={dispatch}
          />
          {startMenuVisible && (
            <StartMenu windows={windows} dispatch={dispatch} />
          )}
          <TaskBar
            windows={windows}
            dispatch={dispatch}
            startMenuVisible={startMenuVisible}
            setStartMenuVisible={setStartMenuVisible}
          />
        </Html>
        {/* <ambientLight intensity={0.3} />
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
        <pointLight position={[-5, 2, 10]} intensity={1} /> */}
        {/* <group>
          <mesh rotation={[0, -0.4, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color={"#008284"} />
          </mesh>
        </group> */}
      </Canvas>
    </>
  )
}

export default App
