import './scss/app.scss'
import Header from './components/Header'
import Main from './components/Main'

import { Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound'
import Basket from './components/Basket'
import React from 'react'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/basket/" element={<Basket />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
