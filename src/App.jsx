import { useState, useReducer, useContext } from "react"
import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom"
import { Html, softShadows, OrbitControls } from "@react-three/drei"
import { Canvas, extend } from "@react-three/fiber"
import TaskBar from "./components/OS-specific/TaskBar"
import Desktop from "./components/OS-specific/Desktop"

function App() {
  //initial state
  const initialState = {
    user: {},
    windows_in_session: [],
  }
  //Reducer
  const reducer = (action) => {
    switch (action.type) {
      case "login":
      case "close_window":
        return {
          ...state,
          windows_in_session: state.windows_in_session.filter(
            (window) => window.name !== action.payload.name
          ),
        }
      case "toggle_minimize":
        return {
          ...state,
          windows_in_session: state.windows_in_session.map((window) => {
            if (window.name === action.payload.name) {
              return { ...window, minimized: !minimized }
            }
            return window
          }),
        }
      default:
        return state
    }
  }
  //example
  // const handleClick = (e) => {
  //   dispatch({
  //     type: "minimize",
  //     payload: {
  //       name: "tetris",
  //     },
  //   })
  // }

  // const handleClick = (e) => {
  //   dispatch({
  //     type: "close_window",
  //     payload: {
  //       name: "tetris",
  //     },
  //   })
  // }
  //deconstructed useReducer
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 75 }}>
        <Html fullscreen>
          <Desktop />
          <TaskBar />
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
          {/* <mesh rotation={[0, -0.4, 0]} position={[0, 0, 0.2]}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color={"#FF8284"} />
          </mesh> */}
        </group>
      </Canvas>
    </>
  )
}

export default App
