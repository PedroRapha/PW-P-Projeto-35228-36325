export default function IngredientItem({
        qnt,
        measure,
        ingredient,
        editable = false,
        onMoveUp,
        onMoveDown,
        onRemove,
    }) {
    return (
        <div className="ingredientItem">
            <span>
                {qnt} {measure?.abbreviation || measure?.name} - {ingredient?.name}
            </span>
            {editable && (
                <div className="listItemActions">
                    <button type="button" className="listItemButton" onClick={onMoveUp}>↑</button>
                    <button type="button" className="listItemButton" onClick={onMoveDown}>↓</button>
                    <button type="button" className="listItemButton" onClick={onRemove}>✕</button>
                </div>
            )}
        </div>
    )
}