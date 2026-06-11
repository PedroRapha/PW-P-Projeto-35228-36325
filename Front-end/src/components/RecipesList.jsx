import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import "./RecipesList.css";

export default function RecipesList({ user = null, noRecipesText = "Ainda não foram partilhadas receitas. Sê o primeiro!" }, ) {
    const token = localStorage.getItem("token");

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("name"); // Valor padrão: ordenar por título
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                setError(null);

                const hasSearch = search.trim() !== "";

                if (hasSearch) {
                    const result = await axios.get(
                        `http://localhost:4242/recipes/search`,
                        {
                            params: {
                                name: search,
                                onlyMine: user ? "true" : "false",
                            },
                            headers: user ? { Authorization: `Bearer ${token}` } : {},
                        },
                    );

                    setRecipes(result.data);
                    setTotalPages(1);
                } else {
                    const endpoint = user
                        ? "http://localhost:4242/recipes/my"
                        : "http://localhost:4242/recipes";

                    const response = await axios.get(endpoint, {
                        params: {
                            sort: sortBy,
                            page: page,
                            limit: 6,
                        },
                        headers: user ? { Authorization: `Bearer ${token}` } : {},
                    });

                    setRecipes(response.data.data);
                    setTotalPages(response.data.totalPages || 1);
                }
            } catch (err) {
                console.error("Erro ao carregar receitas:", err);
                setError("Não foi possível carregar as receitas. Tenta mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        // Aplicamos o debounce (timeout) apenas para não sufocar o servidor enquanto digitas
        const delayDebounce = setTimeout(() => {
            fetchRecipes();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search, sortBy, page, user, token]);

    if (error) return <div className="error-status">{error}</div>;

    return (
        <>
            {/* --- BARRA DE CONTROLOS (Pesquisa e Ordenação) --- */}
            <div className="controls-bar">
                <input
                    type="text"
                    placeholder="Pesquisar por nome..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="search-input"
                />

                <select
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        setPage(1);
                    }}
                    className="sort-select"
                >
                    <option value="name">Ordenar Por</option>
                    <option value="name">Nome (A-Z)</option>
                    <option value="category">Categoria</option>
                    <option value="difficulty">
                        Dificuldade (Dífil - Fácil - Média)
                    </option>
                    <option value="creator">Nome de chefe (A-Z)</option>
                </select>
            </div>

            {recipes.length === 0 ? (
                <p className="no-recipes">
                    {noRecipesText}
                </p>
            ) : (
                <div className="recipes-grid">
                    {recipes.map((recipe) => {
                        return <RecipeCard key={recipe.id} recipe={recipe} />;
                    })}
                </div>
            )}

            {/* --- PAGINAÇÃO (Anterior / Próxima) --- */}
            <div className="pagination-bar">
                <button
                    disabled={page === 1 || loading}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="pagination-btn"
                >
                    ← Anterior
                </button>

                <span className="page-indicator">
                    Página {page} de {totalPages}
                </span>

                <button
                    disabled={page === totalPages || loading}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="pagination-btn"
                >
                    Próxima →
                </button>
            </div>
        </>
    );
}
