import { Routes, Route } from 'react-router-dom'; 
import NavBar from './components/NavBar';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Footer from './components/Footer'
import Home from './pages/Home/Home'

function App() {

  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/createrecipe' element={<CreateRecipe />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>

      <Footer/>
    
    </>
  )
}

export default App
