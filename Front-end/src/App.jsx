import { Routes, Route } from 'react-router-dom'; 
import NavBar from './components/NavBar';
import CreateRecipe from './pages/CreateRecipe/CreateRecipe';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Footer from './components/Footer'
import Home from './pages/Home/Home'
import Recipes from './pages/ExploreRecipes/Recipes'
import RecipeDetail from './pages/RecipeDetails/RecipeDetail'
import UpdateRecipe from './pages/UpdateRecipe/UpdateRecipe';

function App() {

  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/createrecipe' element={<CreateRecipe />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/recipe/:id' element={<RecipeDetail />} />
        <Route path='/recipe/:id/update' element={<UpdateRecipe />} />
      </Routes>

      <Footer/>
    
    </>
  )
}

export default App
