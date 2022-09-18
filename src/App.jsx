import React, { useState, useReducer, useContext } from "react"
import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom"
import { Html, softShadows, OrbitControls } from "@react-three/drei"
import { Canvas, extend } from "@react-three/fiber"
import TaskBar from "./components/OS-specific/TaskBar"
import Desktop from "./components/OS-specific/Desktop"
import { fs } from "./utils/fs"

function App() {
  // fs.createDirectory("C:")
  // fs.createDirectory("Documents")
  // fs.createDirectory("Programs")
  // fs.createDirectory("Bookmarks")
  // fs.printCurrentDirectory()
  //initial state
  const initialState = []
  //Reducer
  const reducer = (action) => {
    switch (action.type) {
      case "open_window":
        return [...windows, action.payload]
      case "close_window":
        return windows.filter((window) => window.name !== action.payload.name)
      case "toggle_minimize":
        return windows.map((window) => {
          if (window.name === action.payload.name) {
            return { ...window, minimized: !minimized }
          }
          return window
        })
      // default:
      //   return windows
    }
  }

  //deconstructed useReducer and WindowContext
  const [windows, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 75 }}>
        <Html fullscreen>
          <Desktop fs={fs} windows={windows} dispatch={dispatch} />
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
