import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/index.css'
import reportWebVitals from './app/reportWebVitals'
import App from './app/app'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <App />
)

reportWebVitals()
