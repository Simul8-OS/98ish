import { useState, useReducer, useContext } from "react"
import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom"
import { Html, softShadows, OrbitControls } from "@react-three/drei"
import { Canvas, extend } from "@react-three/fiber"
import TaskBar from "./components/TaskBar"
import Desktop from "./components/Desktop"
// extend()

function App() {
  // softShadows()
  return (
    <>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 75 }}>
        <Html fullscreen>
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
          <mesh rotation={[0, -0.4, 0]} position={[0, 0, 0.2]}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color={"#FF8284"} />
          </mesh>
        </group>
      </Canvas>
    </>
  )
}

export default App
