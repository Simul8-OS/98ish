import React, { useState, useReducer, useContext } from "react"
import { Html, softShadows, OrbitControls } from "@react-three/drei"
import { Canvas, extend } from "@react-three/fiber"
import TaskBar from "./components/OS-specific/TaskBar"
import Desktop from "./components/OS-specific/Desktop"
import { fs } from "./utils/fs"
import { programs } from "./utils/programs"

const reducer = (state, action) => {
  switch (action.type) {
    case "open_window":
      return [...state, { ...action.payload }]

    case "close_window":
      return state.filter((_, idx) => idx !== action.payload.index)

    case "toggle_minimize":
      return state.map((window, idx) => {
        if (idx === action.payload.index) {
          return { ...window, minimized: !window.minimized }
        }
        return window
      })

    case "toggle_maximize":
      return state.map((window, idx) => {
        if (idx === action.payload.index) {
          return { ...window, maximized: !window.maximized }
        }
        return window
      })

    default:
      return state
  }
}

function App() {
  const [windows, dispatch] = useReducer(reducer, [])

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
