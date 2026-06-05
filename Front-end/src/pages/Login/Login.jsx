import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx"
import cakeImg from "../../assets/hoaluu-cake-pixabay.jpg";
import { useNavigate } from "react-router-dom";
import '../LoginRegister.css'


export default function Login() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const [ success, setSuccess ] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setSuccess("");

        const dados = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dados),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || result.message || "Erro ao efetuar login");
            }

            login(result.user, result.token);
            setSuccess("Login efetuado com sucesso!");

            setTimeout(() => {
                navigate("/");
            }, 500);

            setEmail("");
            setPassword("");
        } catch (error){
            setError(error.message || "Servidor indisponível no momento");
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }

    return (
        <main className="loginRegisterPage">
            <div className="formContainer">
                <img src={cakeImg} className="formImg" />
                <form className="loginSignUpForm" onSubmit={handleSubmit}>
                    <h2>Iniciar sessão</h2>

                    <div className={
                        `resultMessage ${error ? "errorMessage" : success ? "successMessage" : ""}`
                    }>{error || success}</div>

                    <div className="input">
                        {/*<label htmlFor="loginEmail">Email</label>*/}
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id="loginEmail"
                            name="loginEmail"
                            placeholder="Insira o teu @email"
                            required
                        />
                    </div>
                    <div className="input">
                        {/*<label htmlFor="loginPassword">Password</label>*/}
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            id="loginPassword"
                            name="loginPassword"
                            placeholder="A tua palavra-passe"
                            required
                        />
                    </div>

                    <p className="registaTe">Não tens conta? <a href="/register">Regista-te aqui.</a></p>

                    <div className="submitButton">
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </main>
    )
}