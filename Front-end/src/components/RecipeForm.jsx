import { useEffect, useRef, useState } from "react";
import RecipeBasicInfo from "./RecipeBasicInfo";
import IngredientEditor from "./IngredientEditor";
import StepEditor from "./StepEditor";
import mainLogoBW from "../assets/cooking-bw.png"
import './RecipeForm.css'
import { useNavigate } from "react-router-dom";

export default function RecipeForm({ title, submitText, onSubmit, initialData = null}){
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
    const messageRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!initialData) return;

        setName(initialData.name || "");
        setImage(initialData.image || "");
        setPrepTime(initialData.prepTime || "");
        setIsPublic(initialData.isPublic ?? true);
        setDescription(initialData.description || "");
        setCategoryId(initialData.categoryId || "");
        setDifficultyId(initialData.difficultyId || "");
        setIngredients(initialData.ingredients?.map((thisIngredient) => ({
            ingredientId: thisIngredient.ingredientId || thisIngredient.ingredient?.id,
            measureId: thisIngredient.measureId || thisIngredient.measure?.id,
            qnt: thisIngredient.qnt,
            ingredient: thisIngredient.ingredient,
            measure: thisIngredient.measure,
        })) || []);
        setSteps(initialData.steps?.map((thisStep) =>
            typeof thisStep === "string"
                ? { description: thisStep }
                : thisStep
        ) || []);
    }, [initialData])

    function addIngredient(newIngredient){
        setIngredients((currentIngredients) => [...currentIngredients, newIngredient]);
    }

    function removeIngredient(indexToRemove){
        setIngredients((currentIngredients) =>
            currentIngredients.filter((_, index) => index !== indexToRemove)
        );
    }

    function moveIngredientUp(index){
        if(index === 0) return;

        setIngredients((currentIngredients) => {
            const newIngredients = [...currentIngredients];

            [newIngredients[index - 1], newIngredients[index]] = [newIngredients[index], newIngredients[index - 1]];

            return newIngredients;
        });
    }

    function moveIngredientDown(index){
        setIngredients((currentIngredients) => {
            if(index === currentIngredients.length - 1) return currentIngredients;

            const newIngredients = [...currentIngredients];

            [newIngredients[index], newIngredients[index + 1]] = [newIngredients[index + 1], newIngredients[index]];

            return newIngredients;
        });
    }

    function addStep(newStep){
        setSteps((currentSteps) => [...currentSteps, newStep]);
    }

    function removeStep(indexToRemove){
        setSteps((currentSteps) =>
            currentSteps.filter((_, index) => index !== indexToRemove)
        );
    }

    function moveStepUp(index){
        if(index === 0) return;

        setSteps((currentSteps) => {
            const newSteps = [...currentSteps];

            [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];

            return newSteps;
        })
    }

    function moveStepDown(index){
        setSteps((currentSteps) => {
            if(index === currentSteps.length - 1) return currentSteps;

            const newSteps = [...currentSteps];

            [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];

            return newSteps;
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!name.trim() || !categoryId || !difficultyId) {
            setError("Preenche o nome, a categoria e a dificuldade da receita");
            return;
        }

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
            const createdRecipe = await onSubmit(recipeData);
            setSuccess("Receita guardada com sucesso!");

            setTimeout(() => {
                navigate(`/recipe/${createdRecipe.id}`);
            }, 1000);
        } catch (error) {
            setError(error.message || "Servidor indisponível no momento");
        }
    }

    useEffect(() => {
        if(!error && !success) return;

        messageRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, [error, success])

    useEffect(() => {
        if(!error) return;

        const timeoutId = setTimeout(() => {
            setError("");
        }, 3000);

        return () => clearTimeout(timeoutId);
    },[error]);

    return (
        <main className="recipeForm">
            <div className="imgContainer">
                <img src={image === "" ? mainLogoBW : image} alt="Pré-visualização da imagem da receita" />
            </div>
            <form onSubmit={handleSubmit}>
                <h2>{title}</h2>
                
                <div ref={messageRef} className={`resultMessage ${error ? "errorMessage" : success ? "successMessage" : ""}`}>
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
                    onRemoveIngredient={removeIngredient}
                    onMoveIngredientUp={moveIngredientUp}
                    onMoveIngredientDown={moveIngredientDown}
                />

                <StepEditor
                    onAddStep={addStep}
                    steps={steps}
                    onRemoveStep={removeStep}
                    onMoveStepUp={moveStepUp}
                    onMoveStepDown={moveStepDown}
                />

                <button type="submit" className="recipeSubmitButton">{submitText}</button>
            </form>
        </main>
    )
}