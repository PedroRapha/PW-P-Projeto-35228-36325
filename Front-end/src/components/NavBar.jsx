import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import mainLogo from "../assets/cooking.png"
import './NavBar.css'

export default function NavBar() {
    const { user, logout } = useAuth();
    
    function handleLogout() {
        logout();
    }

    return (
        <div>
            <nav className="container">
                <div className="image" >
                    <NavLink className="navBarTitle" to="/">
                        <img src={mainLogo} alt="image of project" />
                        <h1>TakeNote</h1>
                    </NavLink>
                </div>
                <div>
                    <ul className="links">
                        <li><NavLink className="link" to="/recipes" >Explorar Receitas</NavLink></li>
                        {user ? (
                            <>
                                <li><NavLink className="link" to="/createrecipe">Criar Receita</NavLink></li>
                                <li><NavLink className="link" to="/me">Meu perfil</NavLink> </li>
                                <li><NavLink className="link" to="/" onClick={handleLogout}>Encerrar sessão</NavLink> </li>
                            </>
                        ) : (
                            <li><NavLink className="link" to="/login">Iniciar sessão</NavLink> </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>

    )
}