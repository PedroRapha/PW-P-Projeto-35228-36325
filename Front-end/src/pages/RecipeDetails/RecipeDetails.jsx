import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../../services/api";
import axios from "axios";
import "./RecipeDetails.css";
import { useAuth } from "../../context/AuthContext";
import DeleteRecipeModal from "../../components/DeleteRecipeModal";

export default function RecipeDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados de interação com o utilizador
    const [isFavorite, setIsFavorite] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [showDeleteRecipe, setShowDeleteRecipe] = useState(false);

    const token = localStorage.getItem("token");
    const isUserLoggedIn = !!token;
    const isCreator = isUserLoggedIn && user && recipe && user.id === recipe.creator?.id;

    const location = useLocation();
    const backTo = location.state?.from || "/recipes";
    const backText = backTo === "/me" ? "← Voltar para o Meu Perfil" : "← Voltar para as Receitas"
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                setLoading(true);

                const response = await axios.get(`${API_URL}/recipes/${id}`);
                setRecipe(response.data);

                if (token) {
                    try {
                        const favoriteCheck = await axios.get(
                            `${API_URL}/authRecipe/favorite/${id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                },
                            },
                        );
                        if (favoriteCheck.data.favorited) {
                            setIsFavorite(true);
                        }
                    } catch (favErr) {
                        console.warn(
                            "Não foi possível verificar o estado do favorito:",
                            favErr,
                        );
                    }
                }

                setLoading(false);
            } catch (err) {
                console.error("Erro ao carregar detalhes:", err);
                setError("Não foi possível carregar os detalhes desta receita.");
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [id, token]);

    const toggleFavorite = async () => {
        try {
            if (!token) return;
            await axios.post(
                `${API_URL}/authRecipe/favorite/${id}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setIsFavorite((currentFavoriteStatus) => {
                const nextFavoriteStatus = !currentFavoriteStatus;

                setRecipe((currentRecipe) => ({
                    ...currentRecipe,
                    _count: {
                        ...currentRecipe._count,
                        favorites:
                            (currentRecipe._count?.favorites || 0) +
                            (nextFavoriteStatus ? 1 : -1),
                    },
                }));

                return nextFavoriteStatus;
            });
        } catch (err) {
            console.error("Erro ao atualizar favorito:", err);
            alert("Não foi possível atualizar os favoritos.")
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (userRating === 0) {
            alert("Por favor, seleciona pelo menos 1 estrela para avaliar!");
            return;
        }

        try {
            await axios.post(
                `${API_URL}/authRecipe/review/${id}`,
                {
                    rating: userRating,
                    comment: comment,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            alert("Avaliação enviada com sucesso!");

            if (recipe) {
                const newReview = {
                    user: { name: "Tu" },
                    rating: userRating,
                    comment: comment,
                };
                setRecipe({
                    ...recipe,
                    reviews: [newReview, ...(recipe.reviews || [])],
                    _count: {
                        ...recipe._count,
                        reviews: (recipe._count?.reviews || 0) + 1,
                    },
                });
            }
            setComment("");
        } catch (err) {
            console.error("Erro ao enviar avaliação:", err);
            alert("Erro ao enviar a tua avaliação. Tenta novamente.");
        }
    };

    if (loading)
        return (
            <div className="loading-status">A preparar os detalhes da receita...</div>
        );
    if (error)
        return (
            <div className="error-status">
                {error} <Link to="/recipes">Voltar</Link>
            </div>
        );
    if (!recipe)
        return <div className="error-status">Receita não encontrada.</div>;

    const totalFavorites = recipe._count?.favorites || 0;

    const deleteRecipe = async () => {
        try {
            await axios.delete(`${API_URL}/recipes/${recipe.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setShowDeleteRecipe(false);
            navigate("/me");
        } catch (error) {
            console.error("Erro ao excluir receita", error);
            alert("Não foi possível excluir a receita.");
        }
    }

    return (
        <div className="recipe-detail-page">
            <div className="return">
                <Link to={backTo} className="back-link">
                    {backText}
                </Link>
            </div>

            <div className="recipe-header">
                <div className="recipe-image-container">
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="recipe-detail-image"
                    />
                </div>
                <div className="content-title-description">
                    <h1 className="recipe-title-detail">{recipe.name}</h1>
                    {isCreator && <div className="recipe-update">
                        <Link to={"/recipe/" + id + "/update"} className="update-link">
                            Editar receita
                        </Link>
                    </div>}
                    <p className="recipe-description-text">
                        {recipe.description ||
                            "Esta deliciosa receita não possui uma descrição detalhada, mas o seu modo de preparo fala por si!"}
                    </p>
                    <div>
                        <p className="recipe-favorites-count">
                            ❤️ {totalFavorites} pessoas adicionaram aos favoritos
                        </p>
                        {isUserLoggedIn ? (
                            <button
                                className={`favorite-btn ${isFavorite ? "active" : ""}`}
                                onClick={toggleFavorite}
                            >
                                {isFavorite ? "❤️ Nos Favoritos" : "🤍 Favoritar"}
                            </button>
                        ) : (
                            <Link to="/login" className="login-warning-btn">
                                🔒 Login para Favoritar
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Imagem */}

            {/* Informações Rápidas */}
            <div className="recipe-meta-grid">
                <div className="meta-box">
                    <span>⏱️ Tempo</span>
                    <strong>{recipe.prepTime ? `${recipe.prepTime} min` : "N/D"}</strong>
                </div>
                <div className="meta-box">
                    <span>📁 Categoria</span>
                    <strong>{recipe.category?.name || "Geral"}</strong>
                </div>
                <div className="meta-box">
                    <span>📊 Dificuldade</span>
                    <strong>{recipe.difficulty?.name || "Média"}</strong>
                </div>
                <div className="meta-box">
                    <span>👨‍🍳 Chefe</span>
                    <strong>{recipe.creator?.name || "Anónimo"}</strong>
                </div>
            </div>

            {/* Descrição */}
            <div className="recipe-description-section">
                <h2>Sobre a Receita</h2>
            </div>

            {/* Conteúdo Duplo: Ingredientes e Passos */}
            <div className="recipe-content-grid">
                <div className="ingredients-block">
                    <h2>Ingredientes</h2>
                    {recipe.ingredients && recipe.ingredients.length > 0 ? (
                        <ul className="ingredients-list">
                            {recipe.ingredients.map((item, index) => (
                                <li key={index}>
                                    <span className="ingredient-qnt">
                                        {item.qnt}
                                        {item.measure?.abbreviation}
                                    </span>
                                    <span className="ingredient-name">
                                        {item.ingredient?.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum ingrediente listado.</p>
                    )}
                </div>

                <div className="steps-block">
                    <h2>Modo de Preparo</h2>
                    {recipe.steps && recipe.steps.length > 0 ? (
                        <ol className="steps-list">
                            {recipe.steps.map((step, index) => (
                                <li key={index}>
                                    <span className="step-number">{index + 1}</span>
                                    <p className="step-text">{step}</p>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p>Nenhum passo listado.</p>
                    )}
                </div>
            </div>

            {isCreator && (
                <div className="delete-container">
                    <button type="button" className="delete-button" onClick={() => setShowDeleteRecipe(true)}>
                        Eliminar receita
                    </button>
                </div>
            )}

            {/* ÁREA DE AVALIAÇÃO + COMENTÁRIO FORMULÁRIO */}
            <div className="rating-section">
                <h3>O que achaste desta receita?</h3>

                {isUserLoggedIn ? (
                    <form onSubmit={handleReviewSubmit} className="review-form">
                        {/* Bloco de Estrelas Interativas */}
                        <div className="stars-container">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    className={`star-button ${star <= (hoverRating || userRating) ? "on" : "off"}`}
                                    onClick={() => setUserRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                >
                                    <span className="star">&#9733;</span>
                                </button>
                            ))}
                        </div>

                        <p className="rating-text">
                            {userRating > 0
                                ? `A tua nota: ${userRating} de 5 estrelas`
                                : "Seleciona a estrela acima!"}
                        </p>

                        {/* Bloco de Input de Texto do Comentário */}
                        <div className="comment-input-group">
                            <textarea
                                placeholder="Deixa aqui a tua opinião ou dica sobre esta receita..."
                                className="comment-textarea"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                            <button type="submit" className="submit-review-btn">
                                Enviar Avaliação e Comentário
                            </button>
                        </div>
                    </form>
                ) : (
                    <p className="login-alert">
                        💡 Gostaste do prato?{" "}
                        <Link id="link" to="/login">
                            <strong>Faz login</strong>
                        </Link>{" "}
                        para deixar a tua avaliação e comentário!
                    </p>
                )}
            </div>

            {/* COMENTÁRIOS DO BACK-END */}
            <div className="reviews-section">
                <h3>Comentários dos Cozinheiros ({recipe._count?.reviews || 0})</h3>
                {recipe.reviews && recipe.reviews.length > 0 ? (
                    <div className="reviews-list">
                        {recipe.reviews.map((review, index) => (
                            <div key={index} className="review-card-item">
                                <div className="review-card-header">
                                    <strong className="review-user-name">
                                        {review.user?.name}
                                    </strong>
                                    <span className="review-user-rating">
                                        {"★".repeat(review.rating)}
                                        {"☆".repeat(5 - review.rating)}
                                    </span>
                                </div>
                                <p className="review-comment-text">"{review.comment}"</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-reviews">
                        Ainda ninguém comentou. Seja o primeiro a cozinhar e a deixar um
                        feedback!
                    </p>
                )}
            </div>

            {showDeleteRecipe && (
                <DeleteRecipeModal
                    onClose={() => setShowDeleteRecipe(false)}
                    onConfirm={deleteRecipe}
                />
            )}
        </div>
    );
}
