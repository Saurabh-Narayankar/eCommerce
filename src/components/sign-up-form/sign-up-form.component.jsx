import { useState } from "react";
import { createAuthUserWithEmailandPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component'

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmpassword: '',
} 

const SignUp = () => { 
    
    const [formfields, setformfields] = useState(defaultFormFields);
    const {displayName, email, password, confirmpassword} = formfields;

    const handleChange = (event) => {
        const { name, value } = event.target
        setformfields({...formfields, [name]: value})
    }

    const resetFormFields = () => {
        setformfields(defaultFormFields)
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmpassword) {
            alert('password do not match')
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailandPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName } )
            resetFormFields();

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user Email ID already in use');                
            }else {
                console.log('error', error);
            }
        }
    }


    return(

        <div className="sign-up-container">
            <h1>Don't have an Account?</h1>
            <span>Signup with your Email & Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Name' type="text" required onChange={handleChange} name='displayName' value={displayName}/>
                <FormInput label='Email' type="email" required onChange={handleChange} name='email' value={email}/>
                <FormInput label='Password' type="password" required onChange={handleChange} name='password' value={password}/>
                <FormInput label='Confirm Password' type="password" required onChange={handleChange} name='confirmpassword' value={confirmpassword}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUp;