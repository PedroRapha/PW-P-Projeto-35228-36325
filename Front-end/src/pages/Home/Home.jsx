import image from '../../assets/pexel-food.jpg'
import './Home.css'

export default function Home() {

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
                        <a href="/recipes" className="btn-primary">Começar a Explorar</a>
                        <a href="/signup" className="btn-secondary">Criar Conta</a>
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
                        <h3 className="stat-number">1+</h3>
                        <p className="stat-label">Receitas Deliciosas</p>
                    </div>
                </div>

                <div className="stat-item">
                    <div className="stat-icon">👨‍🍳</div>
                    <div className="stat-info">
                        <h3 className="stat-number">2+</h3>
                        <p className="stat-label">Chefes Ativos</p>
                    </div>
                </div>

                <div className="stat-item">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-info">
                        <h3 className="stat-number">4.9</h3>
                        <p className="stat-label">Avaliação Média</p>
                    </div>
                </div>

            </div>
        </section>
    </main>
);
}