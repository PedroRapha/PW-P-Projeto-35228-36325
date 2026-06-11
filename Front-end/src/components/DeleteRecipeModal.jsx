import './DeleteRecipeModal.css'

export default function DeleteRecipeModal({ onClose, onConfirm }) {
    return (
        <div
            className="modalOverlay"
            onClick={onClose}
        >
            <div
                className="deleteRecipeModalContent"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="closeButton"
                    onClick={onClose}
                >
                    ×
                </button>

                <h3>Eliminar receita</h3>

                <p className="areYouSure">
                    Esta ação não pode ser desfeita. <br />
                    Tens a certeza que desejas prosseguir?
                </p>

                <div className="deleteRecipeActions">
                    <button
                        type="button"
                        className="confirmButton"
                        onClick={onConfirm}
                    >
                        Eliminar receita
                    </button>
                    <button
                        type="button"
                        className="cancelButton"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}