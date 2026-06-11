import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";
import './Footer.css';
import image from '../assets/cooking.png'

export default function Footer() {
    const { user } = useAuth();
    return (
        <footer className="app-footer">
            <div className="footer-container">

                <div className="footer-column">

                    <div> <h4>TakeNote</h4>
                        <p>
                            A tua plataforma digital para descobrir guardar e partilhar as melhores receitas em família.
                        </p> </div>

                </div>

                {/* COLUNA 2: LINKS RÁPIDOS */}
                <div className="footer-column">
                    <h4>Navegação</h4>
                    <ul>
                        <li><Link to="/recipes">Explorar Receitas</Link></li>
                        {user ? <>
                            <li><Link to="/me">Meu Perfil</Link></li>
                            <li><Link to="/createrecipe">Criar Receita</Link></li>
                        </>
                            : <>
                                <li><Link to="/login">Iniciar sessão</Link></li>
                                <li><Link to="/register">Criar conta</Link></li>
                            </>
                        }
                    </ul>
                </div>

                {/* COLUNA 3: AUTORIA ACADÉMICA */}
                <div className="footer-column">
                    <h4>Desenvolvido por</h4>
                    <ul>
                        <li><p>Liedson José Buaró Sanca <span className="student-id">Nº 35228</span></p></li>
                        <li><p>Pedro Raphael Paiva <span className="student-id">Nº 36325</span></p></li>
                        <li className="course-name">Programação Web (PW)</li>
                    </ul>
                </div>

                {/* COLUNA 4: REPOSITÓRIO */}
                <div className="footer-column">
                    <h4>Código Fonte</h4>
                    <p>Consulta o progresso do nosso trabalho no GitHub oficial do projeto.</p>
                    <a
                        href="https://github.com/PedroRapha/PW-P-Projeto-35228-36325"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-btn"
                    >
                        📦 Ver Repositório
                    </a>
                </div>

            </div>

            {/* BARRA DE DIREITOS NO FUNDO */}
            <div className="footer-bottom">
                <div className="bottom-image">
                    <div><img src={image} alt="image of project" /></div>
                    <div> <h4>TakeNote</h4> &copy; {new Date().getFullYear()} </div>

                </div>
            </div>
        </footer>
    );
}