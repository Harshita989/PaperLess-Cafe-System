import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Home from './pages/Home'

function App() {
  const [jokes,setJokes] = useState([])

  

  return (
    <>
    <Home/>
    </>
  )
}

export default App
