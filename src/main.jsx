import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "../node_modules/98.css/dist/98.css"
import { BrowserRouter } from "react-router-dom"
// Temporary: BOOTSTRAP (replace with Material UI)
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
