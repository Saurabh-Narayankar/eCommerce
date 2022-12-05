import SignUp from "../../components/sign-up-form/sign-up-form.component";
import SignIn from "../../components/sign-in-form/sign-in-form.component";
import './auth.styles.scss'

const Auth = () => {


    return (
        <div className="auth-container">
            <SignIn />
            <SignUp />
        </div>
    )
}

export default Auth;