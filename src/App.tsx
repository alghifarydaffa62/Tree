import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import DashboardLayout from './layout/DashboardLayout'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/dashboard' element={<DashboardLayout/>}>
            <Route index element={<Dashboard/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
