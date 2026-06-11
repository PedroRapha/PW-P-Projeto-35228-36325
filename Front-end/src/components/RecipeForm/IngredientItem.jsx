import './IngredientItem.css'

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
                    <button type="button" className="listItemButton moveButton" onClick={onMoveUp}>↑</button>
                    <button type="button" className="listItemButton moveButton" onClick={onMoveDown}>↓</button>
                    <button type="button" className="listItemButton deleteButton" onClick={onRemove}>✕</button>
                </div>
            )}
        </div>
    )
}