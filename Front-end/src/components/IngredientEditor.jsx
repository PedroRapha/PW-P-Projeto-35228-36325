import { useEffect, useState } from "react";
import IngredientItem from "./IngredientItem";
import CreateIngredientModal from "./CreateIngredientModal";
import './IngredientEditor.css';

export default function IngredientEditor({
        onAddIngredient,
        ingredients,
        onRemoveIngredient,
        onMoveIngredientUp,
        onMoveIngredientDown,
    }){
    const [ingredientSearch, setIngredientSearch] = useState("");
    const [ingredientId, setIngredientId] = useState("");
    const [measureId, setMeasureId] = useState("");
    const [qnt, setQnt] = useState("");

    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [availableMeasures, setAvailableMeasures] = useState([]);
    const filteredIngredients = availableIngredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(ingredientSearch.toLowerCase())
    );

    const [showCreateIngredient, setShowCreateIngredient] = useState(false);

    useEffect(() => {
        async function fetchOptions() {
            const ingredientsResponse = await fetch("http://localhost:4242/ingredients");
            const measuresResponse = await fetch("http://localhost:4242/measures");

            const ingredientsData = await ingredientsResponse.json();
            const measuresData = await measuresResponse.json();

            setAvailableIngredients(ingredientsData);
            setAvailableMeasures(measuresData);
        }

        fetchOptions();
    }, []);

    function handleAddIngredient() {
        if(!ingredientId || !measureId || !qnt) {
            return;
        }

        const selectedIngredient = availableIngredients.find(
            (ingredient) => String(ingredient.id) === String(ingredientId)
        );

        const selectedMeasure = availableMeasures.find(
            (measure) => String(measure.id) === String(measureId)
        );

        onAddIngredient({
            ingredientId: Number(ingredientId),
            measureId: Number(measureId),
            qnt: Number(qnt),

            ingredient: selectedIngredient,
            measure: selectedMeasure,
        });

        setIngredientId("");
        setMeasureId("");
        setQnt("");
        setIngredientSearch("");
    }

    function handleIngredientCreated(newIngredient){
        setAvailableIngredients((currentIngredients) => [
            ...currentIngredients,
            newIngredient,
        ]);

        setIngredientId(newIngredient.id);
        setIngredientSearch(newIngredient.name);
        setShowCreateIngredient(false);
    }

    return (
        <section>
            <h3>Ingredientes</h3>

            <div className="ingredientList">
                {ingredients.map((thisIngredient, index) => {
                    return(
                        <IngredientItem
                            key={index}
                            qnt={thisIngredient.qnt}
                            measure={thisIngredient.measure}
                            ingredient={thisIngredient.ingredient}
                            editable={true}
                            onMoveUp={() => onMoveIngredientUp(index)}
                            onMoveDown={() => onMoveIngredientDown(index)}
                            onRemove={() => onRemoveIngredient(index)}
                        />
                    )
                })}
            </div>

            <div className="ingredientInput">
                <div className="qntIngredientInputLabels">
                    <label htmlFor="ingredientQnt" className="ingredientQnt">Quantidade: </label>
                    <label htmlFor="ingredientMsr" className="ingredientMsr">Medida: </label>
                    <label htmlFor="ingredientName" className="ingredientName">Ingrediente: </label>
                </div>
                <div className="recipeInput qntIngredientInput">
                    <input
                        type="number"
                        step="any"
                        id="ingredientQnt"
                        className="ingredientQnt"
                        value={qnt}
                        onChange={(e) => setQnt(e.target.value)}
                        placeholder="Ex: 2"
                        min="0.1"
                    />

                    <select
                        id="ingredientMsr"
                        className="ingredientMsr"
                        value={measureId}
                        onChange={(e) => setMeasureId(e.target.value)}
                    >
                        <option value="">Seleciona uma medida</option>
                        {availableMeasures.map((thisMeasure) => (
                            <option key={thisMeasure.id} value={thisMeasure.id}>
                                {thisMeasure.name}
                            </option>
                        ))}
                    </select>

                    <div className="ingredientAutocomplete">
                        <input
                            type="text"
                            id="ingredientName"
                            className="ingredientName"
                            value={ingredientSearch}
                            onChange={(e) => {
                                setIngredientSearch(e.target.value);
                                setIngredientId("");
                            }}
                            placeholder="Escreve o nome do ingrediente"
                        />

                        {ingredientSearch && !ingredientId && filteredIngredients.length > 0 && (
                            <ul className="autocompleteList">
                                {filteredIngredients.map((thisIngredient) =>(
                                    <li
                                        key={thisIngredient.id}
                                        onClick={() => {
                                            setIngredientId(thisIngredient.id);
                                            setIngredientSearch(thisIngredient.name);
                                        }}
                                    >
                                        {thisIngredient.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="ingredientButtons">
                <button
                    type="button"
                    className="addIngredientButton"
                    onClick={handleAddIngredient}
                >
                    Adicionar ingrediente
                </button>
                <button
                    type="button"
                    className="createIngredientButton"
                    onClick={() => setShowCreateIngredient(true)}
                >
                    Criar novo ingrediente
                </button>

                {showCreateIngredient && (
                    <CreateIngredientModal
                        onClose={() => setShowCreateIngredient(false)}
                        onIngredientCreated={handleIngredientCreated}
                    />
                )}
            </div>
        </section>
    )
}