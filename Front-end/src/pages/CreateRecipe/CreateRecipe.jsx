export default async function CreateRecipe(){
    const measures = await prisma.measures.findMany();

    return (
        <>
            <form>
                <label htmlFor="tituloReceita">Título: </label>
                <input type="text" id="tituloReceita" className="input" />
                <h3>Ingredientes:</h3>
                {/* Espaço para o .map() que vai mostrar a lista de ingredientes já adicionados */}
                <div>
                    <input type="number" step="0.01" name="ingredientQnt" className="input" />
                    <select>
                        <option> </option>
                        {/* Espaço para o .map() que vai apresentar as medidas disponíveis */}
                    </select>
                    <span> </span>
                </div>
            </form>
        </>
    )
}