import { useEffect, useState } from "react";
import './RecipeBasicInfo.css';

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

    useEffect(() => {
        async function fetchOptions(){
            try {
                const categoriesResponse = await fetch("http://localhost:4242/recipeCategories");
                const difficultiesResponse = await fetch("http://localhost:4242/difficulties")

                const categoriesData = await categoriesResponse.json();
                const difficultiesData = await difficultiesResponse.json();

                setAvailableCategories(categoriesData);
                setAvailableDifficulties(difficultiesData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchOptions();
    }, []);

    return (
        <section>
            <h3>Informações básicas</h3>

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
                        <option
                            key={thisCategory.id}
                            value={thisCategory.id}
                        >
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
                        <option
                            key={thisDifficulty.id}
                            value={thisDifficulty.id}
                        >
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
                        checked
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