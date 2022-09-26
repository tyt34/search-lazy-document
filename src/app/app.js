import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Main from '../pages/main/main'

function App() {
  return (
    <section className="app">
      <HashRouter basename={'/'}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                replace to="/1"
              />
            }
          />
          <Route
            path={'/:nowNumberOfPage'}
            element={
              <>
                <Main />
              </>
            }
          />
        </Routes>
      </HashRouter>
    </section>
  )
}

export default App