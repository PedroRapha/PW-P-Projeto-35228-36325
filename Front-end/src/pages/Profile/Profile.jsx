import RecipesList from "../../components/RecipesList";
import { useAuth } from "../../context/AuthContext";
import './Profile.css';

export default function Profile() {
    const { user } = useAuth();

    return (
        <section className="profilePage">
            <h2 className="username">{user.name}</h2>
            <h3 className="title">Minhas receitas</h3>

            <RecipesList
                user={user}
                noRecipesText="Cria a tua primeira receita!"
            />
        </section>
    )
}