export default function StepItem({
        description,
        editable = false,
        onMoveUp,
        onMoveDown,
        onRemove,
    }){
    return (
        <div className="stepItem">
            <span>{description}</span>
            {editable && (
                <div className="listItemActions">
                    <button type="button" className="listItemButton" onClick={onMoveUp}>↑</button>
                    <button type="button" className="listItemButton" onClick={onMoveDown}>↓</button>
                    <button type="button" className="listItemButton" onClick={onRemove}>✕</button>
                </div>
            )}
        </div>
    );
}