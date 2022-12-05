import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailandPassword } from "../../utils/firebase/firebase.utils";


import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component'

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
} 

const SignIn = () => { 
    
    const [formfields, setformfields] = useState(defaultFormFields);
    const { email, password} = formfields;



    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };


    const resetFormFields = () => {
        setformfields(defaultFormFields);
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setformfields({...formfields, [name]: value});
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailandPassword(email, password);
            resetFormFields();

        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('you have entered the wrong password');
                    break;
                case 'auth/user-not-found':
                    alert('Please Sign-Up first');
                    break;
                default:
                    console.log(error);
                    break;
            };
        };
    };


    return(

        <div className="sign-up-container">
            <h1>Already have an Account?</h1>
            <span>Signin with your Email & Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type="email" required onChange={handleChange} name='email' value={email}/>
                <FormInput label='Password' type="password" required onChange={handleChange} name='password' value={password}/>
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttontype='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
};

export default SignIn;