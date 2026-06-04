import { useState } from "react";
import RecipeBasicInfo from "./RecipeBasicInfo";
import IngredientEditor from "./IngredientEditor";
import StepEditor from "./StepEditor";

export default function RecipeForm({ title, submitText, onSubmit}){
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [description, setDescription] = useState("");

    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    const [categoryId, setCategoryId] = useState("");
    const [difficultyId, setDifficultyId] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function addIngredient(newIngredient){
        setIngredients((currentIngredients) => [...currentIngredients, newIngredient]);
    }

    function addStep(newStep){
        setSteps((currentSteps) => [...currentSteps, newStep]);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (ingredients.length === 0) {
            setError("A receita deve ter pelo menos um ingrediente");
            return;
        }

        if (steps.length === 0) {
            setError("A receita deve ter pelo menos um passo");
            return;
        }

        const recipeData = {
            name,
            image: image || undefined,
            description,
            prepTime: prepTime ? Number(prepTime) : undefined,
            isPublic,
            ingredients: ingredients.map((thisIngredient) => ({
                ingredientId: Number(thisIngredient.ingredientId),
                measureId: Number(thisIngredient.measureId),
                qnt: thisIngredient.qnt,
            })),
            steps: steps.map((thisStep) => thisStep.description),
            categoryId: Number(categoryId),
            difficultyId: Number(difficultyId),
        };

        try {
            await onSubmit(recipeData);
            setSuccess("Receita guardada com sucesso!");
        } catch (error) {
            setError(error.message || "Servidor indisponível no momento");
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <h2>{title}</h2>
                
                <div className={`resultMessage ${error ? "errorMessage" : success ? "successMessage" : ""}`}>
                    {error || success}
                </div>

                <RecipeBasicInfo
                    name={name}
                    setName={setName}
                    image={image}
                    setImage={setImage}
                    description={description}
                    setDescription={setDescription}
                    prepTime={prepTime}
                    setPrepTime={setPrepTime}
                    isPublic={isPublic}
                    setIsPublic={setIsPublic}
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                    difficultyId={difficultyId}
                    setDifficultyId={setDifficultyId}
                />

                <IngredientEditor
                    onAddIngredient={addIngredient}
                    ingredients={ingredients}
                />

                <StepEditor
                    onAddStep={addStep}
                    steps={steps}
                />

                <button type="submit">{submitText}</button>
            </form>
        </main>
    )
}