import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import imagem from "../assets/cooking.png"
import './NavBar.css'

export default function NavBar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <div>
            <nav className="container">
                <div className="image" >
                    <img src={imagem} alt="image of project" />
                    <h1>TakeNote</h1>
                </div>
                <div>
                    <ul className="links">
                        <li><NavLink className="link" to="/receitas" >Explorar Receitas</NavLink></li>
                        <li><NavLink className="link" to="/users">Comunidade</NavLink> </li>
                        {user ? (
                            <>
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