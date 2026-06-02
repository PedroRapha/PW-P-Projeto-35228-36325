import { Routes, Route } from 'react-router-dom'; 
import Register from './pages/Register';
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import Login from './pages/Login';

function App() {

  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      <Footer/>
    
    </>
  )
}

export default App
