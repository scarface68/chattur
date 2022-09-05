import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import { AuthProvider } from "./auth/Authentication"
import { ThemeProvider } from "./auth/ThemeContext"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <ThemeProvider>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById("root")
)
