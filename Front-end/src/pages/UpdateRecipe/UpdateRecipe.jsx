import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import axios from "axios";

export default function UpdateRecipe() {
    const { id } = useParams();
    console.log("id da rota: ", id);
    const { token } = useAuth();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await axios.get(`http://localhost:4242/recipes/${id}`);

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || result.message || "Erro ao carregar receita");
                }

                setRecipe(result);
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false);
            }
        }

        fetchRecipe();
    }, [id]);

    async function updateRecipe(recipeData) {
        const response = await axios.put(
            `http://localhost:4242/recipes/${id}`, recipeData,                           
            {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || result.message || "Erro ao atualizar receita");
        }

        return {
            ...result,
            id: id,
        };
    }

    if (loading) return <p>A carregar receita...</p>
    if (error) return <p>{error}</p>

    return (
        <RecipeForm
            title="Editar Receita"
            submitText="Guardar Receita"
            onSubmit={updateRecipe}
            initialData={recipe}
        />
    )
}