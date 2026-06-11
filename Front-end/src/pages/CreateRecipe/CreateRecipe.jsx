import { useAuth } from "../../context/AuthContext"
import RecipeForm from "../../components/RecipeForm/RecipeForm";

export default function CreateRecipe(){
    const { token } = useAuth();

    async function createRecipe(recipeData) {
        const response = await axios.post("http://localhost:4242/recipes", recipeData,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const result = await response.json();

        if(!response.ok) {
            throw new Error(result.error || result.message || "Erro ao criar receita");
        }

        return result;
    }

    return (
        <RecipeForm
            title="Criar Receita"
            submitText="Guardar Receita"
            onSubmit={createRecipe}
        />
    )
}