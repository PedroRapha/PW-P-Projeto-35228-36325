export default function RecipeBasicInfo({
    name,
    setName,
    image,
    setImage,
    prepTime,
    setPrepTime,
    isPublic,
    setIsPublic,
}) {
    return (
        <section>
            <h3>Informações básicas</h3>

            <div className="input">
                <label htmlFor="recipeName">Nome da receita: </label>
                <input
                    type="text"
                    id="recipeName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Bolo de Chocolate"
                    required
                />
            </div>

            <div className="input">
                <label htmlFor="recipeImage">Imagem: </label>
                <input
                    type="text"
                    id="recipeImage"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="URL da imagem"
                />
            </div>

            <div className="input">
                <label htmlFor="prepTime">Tempo de preparo: </label>
                <input
                    type="number"
                    id="prepTime"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    placeholder="Ex: 45"
                    min="1"
                />
            </div>

            <div className="input">
                <label htmlFor="isPublic">É pública: </label>
                <input
                    type="checkbox"
                    id="isPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
            </div>
        </section>
    );
}