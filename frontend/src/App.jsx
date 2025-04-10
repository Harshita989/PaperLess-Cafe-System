import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Form from './components/Form'
import Menu from './components/Menu'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  )
}

export default App
