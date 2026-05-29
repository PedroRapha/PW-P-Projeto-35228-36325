import { NavLink } from "react-router-dom";
import imagem from "../assets/cooking.png"
import './NavBar.css'

export default function NavBar() {

    return (
        <div>

            <nav className="conteiner">
                <div className="image" >
                    <img src={imagem} alt="image of project" />
                    <h1>TakeNote</h1>
                </div>
                <div>
                    <ul className="links">
                        <li><NavLink className="link" to="/receitas" >Explorar Receitas</NavLink></li>
                        <li><NavLink className="link" to="/users">Comunidade</NavLink> </li>
                        <li><NavLink className="link" to="/signUp" >Criar conta</NavLink></li>
                        <li><NavLink className="link" to="/signIn">Iniciar sessão</NavLink> </li>
                    </ul>
                </div>
            </nav>
        </div>

    )
}