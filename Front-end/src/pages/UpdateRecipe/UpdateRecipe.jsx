import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import { API_URL } from "../../services/api";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import axios from "axios";

export default function UpdateRecipe() {
    const { id } = useParams();
    const { token } = useAuth();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchRecipe() {
            try {
                const response = await axios.get(`${API_URL}/recipes/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                setRecipe(response.data);
            } catch (error) {
                setError(
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    error.message ||
                    "Erro ao carregar receita"
                )
            } finally {
                setLoading(false);
            }
        }

        fetchRecipe();
    }, [id, token]);

    async function updateRecipe(recipeData) {
        const response = await axios.put(
            `${API_URL}/recipes/${id}`, recipeData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return {
            ...response.data,
            id,
        };
    }

    if (loading) return <p className="loading-information">A carregar receita...</p>
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