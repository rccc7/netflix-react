import React, { useRef } from 'react'
import { auth } from '../firebase';
import './SignupScreen.css';
// import { doc, setDoc } from 'firebase/firestore';
import db from '../firebase'


function SignupScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();

        //Create an account with the provided email and password:
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log('The new user: ', authUser);

            //Register the new created user to the database
            db.collection('customers').doc().set({
                email: emailRef.current.value,
            });

        }).catch((error) => {
            alert(error.message);
        })
    }

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
            console.log(authUser);
        }).catch(error => alert(error.message));
    };

    return (
        <div className='signupScreen'>
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder='Email' type='email' />
                <input ref={passwordRef} placeholder='Password' type='password' />
                <button type='Submit' onClick={signIn}>Sign In</button>
                <h4>
                    <span className='signupScreen__gray'>New to Netflix? </span>
                    <span className='signupScreen__link' onClick={register}>Sign Up now.</span>
                </h4>
                <h4 className='singupScreen__hint'>Or use the following test credentials: <br></br>Email: test@gmail.com, Password: test123</h4>
            </form>
        </div >
    )
}

export default SignupScreen
