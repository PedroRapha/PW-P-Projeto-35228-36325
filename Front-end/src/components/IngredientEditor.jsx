import { useEffect, useState } from "react";
import IngredientItem from "./IngredientItem";

export default function IngredientEditor({ onAddIngredient, ingredients }){
    const [ingredientSearch, setIngredientSearch] = useState("");
    const [ingredientId, setIngredientId] = useState("");
    const [measureId, setMeasureId] = useState("");
    const [qnt, setQnt] = useState("");

    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [availableMeasures, setAvailableMeasures] = useState([]);
    const filteredIngredients = availableIngredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(ingredientSearch.toLowerCase())
    );

    useEffect(() => {
        async function fetchOptions() {
            const ingredientsResponse = await fetch("http://localhost:3000/ingredients");
            const measuresResponse = await fetch("http://localhost:3000/measures");

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
            ingredientId,
            measureId,
            qnt: Number(qnt),

            ingredient: selectedIngredient,
            measure: selectedMeasure,
        });

        setIngredientId("");
        setMeasureId("");
        setQnt("");
        setIngredientSearch("");
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
                        />
                    )
                })}
            </div>

            <div className="input">
                <label htmlFor="ingredientQnt">Quantidade: </label>
                <input
                    type="number"
                    step="any"
                    id="ingredientQnt"
                    value={qnt}
                    onChange={(e) => setQnt(e.target.value)}
                    placeholder="Ex: 2"
                    required
                    min="0.1"
                />
            </div>

            <div className="input">
                <select
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
            </div>

            <div className="input autocomplete">
                <input
                    type="text"
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

            <button type="button" onClick={handleAddIngredient}>
                Adicionar ingrediente
            </button>
        </section>
    )
}