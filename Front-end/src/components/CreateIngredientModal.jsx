import { useEffect, useState } from "react";
import './CreateIngredientModal.css'

export default function CreateIngredientModal({ onClose, onIngredientCreated }) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch("http://localhost:4242/ingredientCategories");
            const data = await response.json();
            setCategories(data);
        }

        fetchCategories();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!name.trim() || !categoryId) {
            setError("Preenche o nome e a categoria do ingrediente");
            return;
        }

        try {
            const response = await fetch("http://localhost:4242/ingredients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
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

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <h3>Criar novo ingrediente</h3>
                <p>Não encontrou seu ingrediente? Crie um novo abaixo!</p>

                {error && <p className="errorMessage">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}