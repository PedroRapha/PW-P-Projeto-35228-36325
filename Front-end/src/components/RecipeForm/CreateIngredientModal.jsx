import { useEffect, useState } from "react";
import { API_URL } from "../../services/api";
import './CreateIngredientModal.css'
import { useAuth } from "../../context/AuthContext";

export default function CreateIngredientModal({ onClose, onIngredientCreated }) {
    const { token } = useAuth();
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchCategories() {
            try{
                const response = await fetch(`${API_URL}/ingredientCategories`);

                if(!response.ok) {
                    throw new Error("Erro ao carregar as categorias de ingredientes.");
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
                setError("Não foi possível carregar as categorias de ingredientes.");
            }
        }

        fetchCategories();
    }, []);

    async function handleCreateIngredient() {
        setError("");

        if (!name.trim() || !categoryId) {
            setError("Preenche o nome e a categoria do ingrediente");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/ingredients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: name.trim(),
                    categoryId: Number(categoryId),
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || result.message || "Erro ao criar ingrediente");
            }

            onIngredientCreated(result);
        } catch (error) {
            setError(error.message);
        }
    }

    function handleCreateIngredientKeyDown(e){
        if (e.key !== "Enter") {
            return;
        }

        e.preventDefault();
        handleCreateIngredient();
    }

    return (
        <div
            className="modalOverlay"
            onClick={onClose}
        >
            <div
                className="modalContent"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="createIngredientCloseButton"
                    onClick={onClose}
                >
                    ×
                </button>

                <h3>Criar novo ingrediente</h3>

                {error && <p className="errorMessage">{error}</p>}

                <div className="createIngredientForm">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleCreateIngredientKeyDown}
                        placeholder="Nome do ingrediente"
                    />

                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">Seleciona uma categoria</option>

                        {categories.map((thisCategory) => (
                            <option key={thisCategory.id} value={thisCategory.id}>
                                {thisCategory.name}
                            </option>
                        ))}
                    </select>

                    <div className="createIngredientActions">
                        <button type="button" className="createIngredientSaveButton" onClick={handleCreateIngredient}>Guardar</button>
                        <button type="button" className="createIngredientCancelButton" onClick={onClose}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}