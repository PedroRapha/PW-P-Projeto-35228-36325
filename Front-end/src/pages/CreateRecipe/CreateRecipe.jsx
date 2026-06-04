import { useState } from "react";
import { useAuth } from "../../context/AuthContext"
import RecipeBasicInfo from "../../components/RecipeBasicInfo";
import IngredientEditor from "../../components/IngredientEditor";

export default function CreateRecipe(){
    const { token } = useAuth();

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [isPublic, setIsPublic] = useState(true);

    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    const [categoryId, setCategoryId] = useState("");
    const [difficultyId, setDifficultyId] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function addIngredient(){}

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setSuccess("");

        const recipeData = {
            name,
            image,
            prepTime: prepTime ? Number(prepTime) : undefined,
            isPublic,
            ingredients,
            steps,
            categoryId,
            difficultyId,
        };

        try {
            const response = await fetch("http://localhost:3000/recipe", {
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

            setSuccess("Receita criada com sucesso!");
        } catch (error) {
            setError(error.message || "Servidor indisponível no momento");
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <h2>Criar receita</h2>
                
                <div className={`resultMessage ${error ? "errorMessage" : success ? "successMessage" : ""}`}>
                    {error || success}
                </div>

                <RecipeBasicInfo
                    name={name}
                    setName={setName}
                    image={image}
                    setImage={setImage}
                    prepTime={prepTime}
                    setPrepTime={setPrepTime}
                    isPublic={isPublic}
                    setIsPublic={setIsPublic}
                />

                <IngredientEditor
                    onAddIngredient={addIngredient}
                    ingredients={ingredients}
                />

                <button type="submit">Guardar receita</button>
            </form>
        </main>
    )
}