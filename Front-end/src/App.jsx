import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import SignUp from './pages/SignUp';
import NavBar from './components/NavBar';
import Footer from './components/Footer'

function App() {

  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path='/signUp' element={<SignUp />} />
      </Routes>

      <Footer/>
    
    </BrowserRouter>
  )
}

export default App
