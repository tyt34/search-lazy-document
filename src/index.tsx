import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/index.css'
import Main from './pages/main/main'
import reportWebVitals from './app/reportWebVitals'
import App from './app/app'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
/*
root.render(
  <React.StrictMode>
    <Main />
 </React.StrictMode>,
)
*/

/*
root.render(
  <Main />
)
*/

root.render(
  <App />
)

reportWebVitals()
