import React from 'react';
import './Footer.css';
import image from '../assets/cooking.png'

export default function Footer() {
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
                        <li><a href="/">Iniciar sessão</a></li>
                        <li><a href="/">Criar conta</a></li>
                        <li><a href="/recipes">Explorar Receitas</a></li>
                        <li><a href="/categories">Comunidade</a></li>
                    </ul>
                </div>

                {/* COLUNA 3: AUTORIA ACADÉMICA */}
                <div className="footer-column">
                    <h4>Desenvolvido por</h4>
                    <ul>
                        <p>Liedson José Buaró Sanca <span className="student-id">Nº 35228</span></p>
                        <p>Pedro Raphael Paiva <span className="student-id">Nº 36325</span></p>
                        <li className="course-name">Programação Web (PW)</li>
                    </ul>
                </div>

                {/* COLUNA 4: REPOSITÓRIO */}
                <div className="footer-column">
                    <h4>Código Fonte</h4>
                    <p>Consulta o progresso do nosso trabalho no GitHub oficial do projeto.</p>
                    <a
                        href="https://github.com/..." // Cola aqui o link do vosso repositório
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