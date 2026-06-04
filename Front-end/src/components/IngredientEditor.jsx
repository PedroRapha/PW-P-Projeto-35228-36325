import { useEffect, useState } from "react";
import IngredientItem from "./IngredientItem";

export default function IngredientEditor({ onAddIngredient, ingredients }){
    const [ingredientId, setIngredientId] = useState("");
    const [measureId, setMeasureId] = useState("");
    const [qnt, setQnt] = useState("");

    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [availableMeasures, setAvailableMeasures] = useState([]);

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

    return (
        <section>
            <h3>Ingredientes</h3>

            <div className="ingredientList">
                {ingredients.map((thisIngredient) => {
                    return(
                        <IngredientItem
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
                    {availableMeasures.map((thisMeasure) => {
                        <option key={thisMeasure.id} value={thisMeasure.id}>
                            {thisMeasure.name}
                        </option>
                    })}
                </select>
            </div>

            <div className="input">
                <select
                    value={ingredientId}
                    onChange={(e) => setIngredientId(e.target.value)}
                >
                    <option value="">Seleciona um ingrediente</option>
                    {availableIngredients.map((thisIngredient) => {
                        <option key={thisIngredient.id} value={thisIngredient.id}>
                            {thisIngredient.name}
                        </option>
                    })}
                </select>
            </div>
        </section>
    )
}