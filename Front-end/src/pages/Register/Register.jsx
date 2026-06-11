import { useState } from "react";
import { API_URL } from "../../services/api";
import cakeImg from "../../assets/hoaluu-cake-pixabay.jpg";
import { useNavigate } from "react-router-dom";
import '../LoginRegister.css'

export default function SignUp() {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const [ success, setSuccess ] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setSuccess("");

        const dados = {
            name: name,
            email: email,
            password: password,
        };

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dados),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || result.message || "Erro ao criar conta");
            }

            setSuccess("Conta criada com sucesso!");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

            setName("");
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
                <img src={cakeImg} alt="Bolo decorativo" className="formImg"/>
                <form className="loginSignUpForm" onSubmit={handleSubmit}>
                    <h2>Criar conta</h2>

                    <div className={
                        `resultMessage ${error ? "errorMessage" : success ? "successMessage" : ""}`
                    }>{error || success}</div>

                    <div className="input">

                        {/*<label htmlFor="signInName">Nome: </label>*/}
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="signInName"
                            name="signInName"
                            placeholder="O teu nome"
                            required
                        />
                    </div>
                    <div className="input">
                        {/*<label htmlFor="signInEmail">Email: </label>*/}
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            id="signInEmail"
                            name="signInEmail"
                            placeholder="exemplo@email.pt"
                            required
                        />
                    </div>
                    {/*FUTURO: Implementar visualização do campo password*/}
                    <div className="input">
                        {/*<label htmlFor="signInPassword">Password: </label>*/}
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            id="signInPassword"
                            name="signInPassword"
                            placeholder="Palavra-passe mín. 8 caract. (A, a, 1))"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            required
                        />
                    </div>

                    <div className="submitButton">
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </main>
    )
}