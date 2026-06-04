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
        window.location.reload();
    }

    return (
        <div>
            <nav className="container">
                <div className="image" >
                    <img src={imagem} alt="image of project" />
                    <h1><NavLink className="navBarTitle" to="/">TakeNote</NavLink></h1>
                </div>
                <div>
                    <ul className="links">
                        <li><NavLink className="link" to="/recipes" >Explorar Receitas</NavLink></li>
                        <li><NavLink className="link" to="/users">Comunidade</NavLink> </li>
                        {/*O componente abaixo é temporário, até encontrarmos o local correto de incluir o link para novas receitas*/}
                        <li><NavLink className="link" to="/createrecipe">Criar Receita</NavLink></li>
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