export default function IngredientItem({ qnt, measure, ingredient }) {
    return (
        <div className="ingredientItem">
            <span>
                {qnt} {measure?.abbreviation || measure?.name} - {ingredient?.name}
            </span>
        </div>
    )
}