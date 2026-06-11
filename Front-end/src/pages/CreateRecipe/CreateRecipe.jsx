import { useAuth } from "../../context/AuthContext"
import { API_URL } from "../../services/api";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import axios from "axios";

export default function CreateRecipe() {
    const { token } = useAuth();

    async function createRecipe(recipeData) {
        const response = await axios.post(`${API_URL}/recipes`, recipeData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

        return response.data;
    }

    return (
        <RecipeForm
            title="Criar Receita"
            submitText="Guardar Receita"
            onSubmit={createRecipe}
        />
    )
}