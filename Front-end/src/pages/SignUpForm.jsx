function SignUpForm() {

    return (
        <>
            <div className="form">
                <h2>Criar conta</h2>
                <div className="errorMessage"></div>
                <div className="input">
                    <label htmlFor="signInName">Nome: </label>
                    <input type="text" id="signInName" name="signInName" placeholder="O teu nome" required/>
                </div>
                <div className="input">
                    <label htmlFor="signInEmail">Email: </label>
                    <input type="email" id="signInEmail" name="signInEmail" placeholder="exemplo@email.pt" required/>
                </div>
                {/*FUTURO: Implementar visualização do campo password*/}
                <div className="input">
                    <label htmlFor="signInPassword">Password: </label>
                    <input type="password" id="signInPassword" name="signInPassword" placeholder="A tua palavra-passe" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required/>
                </div>
                <div className="submitButton">
                    <button type="submit" id="signInSubmitButton" name="signInSubmitButton">Enviar</button>
                </div>
            </div>
        </>
    );
}

export default SignUpForm;