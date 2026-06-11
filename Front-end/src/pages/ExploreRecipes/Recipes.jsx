import RecipesList from "../../components/RecipesList";
import "./Recipes.css";

export default function Recipes() {
    return (
        <div className="explore-page">
            <h2 className="page-title">Explorar Receitas</h2>
            <p className="page-subtitle">
                Descobre novas inspirações culinárias para o teu dia a dia.
            </p>

            <RecipesList />
        </div>
    );
}
