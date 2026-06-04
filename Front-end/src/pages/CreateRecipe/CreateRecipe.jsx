import { useAuth } from "../../context/AuthContext"
import RecipeForm from "../../components/RecipeForm";

export default function CreateRecipe(){
    const { token } = useAuth();

    async function createRecipe(recipeData) {
        const response = await fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(recipeData),
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