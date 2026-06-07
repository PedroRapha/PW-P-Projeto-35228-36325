import { useState, useEffect } from 'react'
import RecipeCard from '../../components/RecipeCard'
import './Recipes.css'

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:4242/recipes');

                setRecipes(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Erro ao carregar receitas:", err);
                setError("Não foi possível carregar as receitas. Tenta mais tarde.");
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div className="explore-page">
            <h2 className="page-title">Explorar Receitas</h2>
            <p className="page-subtitle">Descobre novas inspirações culinárias para o teu dia a dia.</p>

            if (loading) return <div className="loading-status">A carregar receitas deliciosas...</div>;
            if (error) return <div className="error-status">{error}</div>;

            {recipes.length === 0 ? (
        <p className="no-recipes">Ainda não foram partilhadas receitas. Sê o primeiro!</p>
      ) : <RecipeCard recipes={recipes} className="explore-page" /> }

        </div>
    )
}