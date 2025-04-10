import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Form from './components/Form'
import Menu from './components/Menu'
import Admin from './components/Admin'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </Router>
  )
}

export default App
 