function SignUpForm() {

    return (
        <>
            <div className="formContainer">
                <div className="input">
                    <label htmlFor="signInName">Nome: </label>
                    <input type="text" id="signInName" name="signInName" placeholder="O teu nome" required/>
                </div>
                <div className="input">
                    <label htmlFor="signInEmail">Email: </label>
                    <input type="email" id="signInEmail" name="signInEmail" placeholder="exemplo@email.pt" required/>
                </div>
                <div className="input">
                    <label htmlFor="signInPassword">Password: </label>
                    <input type="password" id="signInPassword" name="signInPassword" placeholder="A tua palavra-passe" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required/>
                </div>
            </div>
        </>
    );
}

export default SignUpForm;