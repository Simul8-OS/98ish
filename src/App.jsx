import { useState, useReducer, useContext } from "react"
import { Outlet, Routes, Route } from "react-router-dom"
import TaskBar from "./components/TaskBar"
import Desktop from "./components/Desktop"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Desktop />}></Route>
      </Routes>
      <Outlet />
      <TaskBar />
    </div>
  )
}

export default App
