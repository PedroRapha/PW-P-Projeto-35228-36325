import './StepItem.css'

export default function StepItem({
        index,
        description,
        editable = false,
        onMoveUp,
        onMoveDown,
        onRemove,
    }){
    return (
        <div className="stepItem">
            <div className='stepText'>
                <span className='stepOrder'>{index + 1} - </span>
                <span className='stepDescription'>{description}</span>
            </div>
            {editable && (
                <div className="listItemActions">
                    <button
                        type="button"
                        className="listItemButton moveButton"
                        onClick={onMoveUp}
                    >
                        ↑
                    </button>
                    <button
                        type="button"
                        className="listItemButton moveButton"
                        onClick={onMoveDown}
                    >
                        ↓
                    </button>
                    <button
                        type="button"
                        className="listItemButton deleteButton"
                        onClick={onRemove}
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
}