import React from 'react'
import Home from './pages/Home'
import { SessionProvider } from './context/SessionItem'
function App() {

  return (
    <>
      <SessionProvider>
        <Home />
      </SessionProvider>
    </>
  )
}

export default App
