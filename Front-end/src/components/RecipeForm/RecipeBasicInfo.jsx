import { useEffect, useState } from "react";
import { API_URL } from "../../services/api";
import "./RecipeBasicInfo.css";
import ImageUploader from "../ImageUploader";

export default function RecipeBasicInfo({
    name,
    setName,
    image,
    setImage,
    description,
    setDescription,
    prepTime,
    setPrepTime,
    isPublic,
    setIsPublic,
    categoryId,
    setCategoryId,
    difficultyId,
    setDifficultyId,
}) {
    const [availableCategories, setAvailableCategories] = useState([]);
    const [availableDifficulties, setAvailableDifficulties] = useState([]);
    const [optionsError, setOptionsError] = useState("");

    useEffect(() => {
        async function fetchOptions() {
            try {
                const categoriesResponse = await fetch(`${API_URL}/recipeCategories`);
                const difficultiesResponse = await fetch(`${API_URL}/difficulties`);

                if (!categoriesResponse.ok || !difficultiesResponse.ok) {
                    throw new Error("Erro ao carregar categorias ou dificuldades.");
                }

                const categoriesData = await categoriesResponse.json();
                const difficultiesData = await difficultiesResponse.json();

                setAvailableCategories(categoriesData);
                setAvailableDifficulties(difficultiesData);
            } catch (error) {
                console.error(error);
                setOptionsError("Não foi possível carregar categorias e dificuldades.");
            }
        }

        fetchOptions();
    }, []);

    // No teu formulário de criar/editar receita:
    const handleImageUploaded = (urlDoServidor) => {
        setImage(urlDoServidor);
    };

    return (
        <section>
            <h3>Informações básicas</h3>
            {optionsError && (
                <div className="resultMessage errorMessage">{optionsError}</div>
            )}
            <div className="resultMessage"></div>

            <div className="recipeInput">
                <label htmlFor="recipeName">Nome da receita: </label>
                <input
                    type="text"
                    id="recipeName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Bolo de Chocolate"
                />
            </div>

            <div>
                <ImageUploader onUploadSuccess={handleImageUploaded} />
            </div>

            <div className="recipeInput">
                <label htmlFor="recipeImage">Imagem: </label>
                <input
                    type="text"
                    id="recipeImage"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="URL da imagem"
                />
            </div>

            <div className="recipeInput">
                <label htmlFor="recipeDescription">Descrição: </label>
                <textarea
                    id="recipeDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreve brevemente a receita"
                />
            </div>

            <div className="recipeSelect">
                <label htmlFor="categoryId">Categoria: </label>
                <select
                    id="categoryId"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">Seleciona uma categoria</option>

                    {availableCategories.map((thisCategory) => (
                        <option key={thisCategory.id} value={thisCategory.id}>
                            {thisCategory.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="recipeSelect">
                <label htmlFor="difficultyId">Dificuldade: </label>
                <select
                    id="difficultyId"
                    value={difficultyId}
                    onChange={(e) => setDifficultyId(e.target.value)}
                >
                    <option value="">Seleciona uma dificuldade</option>

                    {availableDifficulties.map((thisDifficulty) => (
                        <option key={thisDifficulty.id} value={thisDifficulty.id}>
                            {thisDifficulty.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="recipeInputPreparo">
                <label htmlFor="prepTime">Tempo de preparo (minutos): </label>
                <input
                    type="number"
                    id="prepTime"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    placeholder="Ex: 45"
                    min="1"
                />
            </div>

            <div className="recipeInput">
                <span>Visibilidade: </span>

                <div className="recipeVisibility">
                    <label htmlFor="public">
                        <input
                            type="radio"
                            id="public"
                            name="isPublic"
                            checked={isPublic === true}
                            onChange={() => setIsPublic(true)}
                        />
                        Pública
                    </label>

                    <label htmlFor="private">
                        <input
                            type="radio"
                            id="private"
                            name="isPublic"
                            checked={isPublic === false}
                            onChange={() => setIsPublic(false)}
                        />
                        Privada
                    </label>
                </div>
            </div>
        </section>
    );
}
