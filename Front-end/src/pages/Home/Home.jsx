import image from '../../assets/pexel-food.jpg'
import { Link } from 'react-router-dom';
import './Home.css'
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { API_URL } from '../../services/api';
import axios from 'axios';

export default function Home() {
    const { token } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalRecipes: 0,
        averageRating: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [users, recipes, reviews] = await Promise.all([
                    axios.get(`${API_URL}/stats/users/count`),
                    axios.get(`${API_URL}/stats/recipes/count`),
                    axios.get(`${API_URL}/stats/reviews/average`),
                ]);

                setStats({
                    totalUsers: users.data.totalUsers,
                    totalRecipes: recipes.data.totalRecipes,
                    averageRating: reviews.data.averageRating,
                });
            } catch (error) {
                console.error("Erro ao carregar estatísticas:", error);
            }
        }

        fetchStats();
    }, []);

    return (
    <main>
        <section className="hero-section">
            <div className="hero-container">

                <div className="hero-content">
                    <span className="hero-tagline">Descobre o Chef que há em ti</span>
                    <h1 className="hero-title">Cozinhar nunca foi tão simples.</h1>
                    <p className="hero-description">
                        Explora centenas de receitas partilhadas pela nossa comunidade.
                        Guarda as tuas favoritas, deixa a tua avaliação e partilha os teus próprios pratos para inspirar outros utilizadores.
                    </p>
                    <div className="hero-actions">
                        <Link to="/recipes" className="btn-primary">Começar a Explorar</Link>
                        {!token && <Link to="/register" className="btn-secondary">Criar Conta</Link>}
                    </div>
                </div>

                <div className="hero-image-wrapper">
                    <img src={image} alt="Prato de comida apetitoso preparado na hora" className="hero-image" />
                </div>

            </div>
        </section>

        <section className="stats-section">
            <div className="stats-container">

                <div className="stat-item">
                    <div className="stat-icon">🍲</div>
                    <div className="stat-info">
                        <h3 className="stat-number">{stats.totalRecipes}</h3>
                        <p className="stat-label">Receitas Deliciosas</p>
                    </div>
                </div>

                <div className="stat-item">
                    <div className="stat-icon">👨‍🍳</div>
                    <div className="stat-info">
                        <h3 className="stat-number">{stats.totalUsers}</h3>
                        <p className="stat-label">Chefes Ativos</p>
                    </div>
                </div>

                <div className="stat-item">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-info">
                        <h3 className="stat-number">{Number(stats.averageRating.toFixed(2))}</h3>
                        <p className="stat-label">Avaliação Média</p>
                    </div>
                </div>

            </div>
        </section>
    </main>
);
}