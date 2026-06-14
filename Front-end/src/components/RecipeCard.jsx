import { Link } from "react-router-dom";
import "./RecipeCard.css";
import mainLogoBW from "../assets/cooking-bw.png";

export default function RecipeCard({ recipe, navigationOrigin }) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="recipe-card"
      state={{ from: navigationOrigin }}
    >
      {/* 1. Imagem da Receita */}
      <div className="recipe-card-image-wrapper">
        <img
          src={recipe.image === null ? mainLogoBW : recipe.image}
          alt={recipe.name}
          className="recipe-card-image"
        />
      </div>

      {/* 2. Conteúdo do Cartão */}
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.name}</h3>
        <p className="recipe-card-description">{recipe.description}</p>
      </div>
    </Link>
  );
}
