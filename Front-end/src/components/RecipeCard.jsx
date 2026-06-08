import React from 'react';
import './RecipeCard.css';

export default function RecipeCard({recipe}) {
  return (
    <div className="recipe-card">
            
            {/* 1. Imagem da Receita */}
            <div className="recipe-card-image-wrapper">
              <img src={recipe.image} alt={recipe.name} className="recipe-card-image" />
            </div>

            {/* 2. Conteúdo do Cartão */}
            <div className="recipe-card-content">
              <h3 className="recipe-card-title">{recipe.name}</h3>
              <p className="recipe-card-description">{recipe.description}</p>
              
              {/* Botão de Ação do Cartão */}
              <a href={`/recipes/${recipe.id}`} className="recipe-card-btn">
                Ver Receita <span>→</span>
              </a>
            </div>

          </div>
  );
}