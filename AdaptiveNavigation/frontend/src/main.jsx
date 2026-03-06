import React from "react"
import ReactDOM from "react-dom/client"
// tool that connects React to the browser/HTML

import "./index.css"
import App from "./App"
ReactDOM.createRoot(document.getElementById("root")).render(<App />)
//empty <div id="root"> from your index.html and inject into App