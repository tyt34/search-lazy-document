import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/index.css'
import reportWebVitals from './app/reportWebVitals'
import App from './app/app'
import { Provider } from 'react-redux'
import { store } from './app/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

reportWebVitals()
