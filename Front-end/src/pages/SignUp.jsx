import SignUpForm from "./SignUpForm";
import cakeImg from "../assets/hoaluu-cake-pixabay.jpg"

function SignUp() {

    return (
        <main>
            <div className="formContainer">
                <img src={cakeImg} className="formImg"/>
                <SignUpForm />
            </div>
        </main>
    )
}

export default SignUp;