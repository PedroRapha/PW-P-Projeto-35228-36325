import RecipesList from "../../components/RecipesList";
import { useAuth } from "../../context/AuthContext"

export default function Profile(){
    const { user } = useAuth();

    return (
        <section>
            <h2 className="username">{user.name}</h2>
            
            <RecipesList user={user} />
        </section>
    )
}