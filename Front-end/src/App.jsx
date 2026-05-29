import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import SignUp from './pages/SignUp';
import NavBar from './components/NavBar';

function App() {

  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
