import React, { useState } from 'react'
import './LoginScreen.css'
import SignupScreen from './SignupScreen'
import { useHistory } from 'react-router';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

function LoginScreen() {
    const [singIn, setSignIn] = useState(false);

    const history = useHistory();

    return (
        <div className='loginScreen'>
            <div className="loginScreen__background">
                <img
                    className='loginScreen__logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png'
                    alt='Netflix, Public domain, via Wikimedia Commons'
                    attribution='https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png'
                />
                <div className="loginScreen__leftButtons">
                    <button
                        onClick={() => setSignIn(true)}
                        className='loginScreen__button'>
                        Sign In
                    </button>
                    <ContactSupportIcon
                        className='loginScreen__about'
                        onClick={() => history.push('/about')}
                    />
                </div>
                {/* This div is used to make the background image visible. 
                Without this div and its class settings the background is not visible.
                This happens because before we added this div there was nothing actually 
                in the body, hence the image wasn't showing*/}
                <div className='loginScreen__gradient' />
            </div>
            <div className="loginScreen__body">

                {singIn ? (
                    <SignupScreen />
                ) : (
                    /* This empty tags <>...</> are a shorthand of <React.Fragment>
                    and allows us to have multiple top-most elements without wrapping 
                    further HTML */
                    <>
                        <h1>Unlimited films, TV programs and more.</h1>
                        <h2>Watch anywhere, Cancel at any time.</h2>
                        <h3>Ready to watch? Enter your email to
                            create or restart your membership.</h3>
                        <div className="loginScreen__input">
                            <form>
                                <input type='email' placeholder='Email Address' />
                                <button
                                    onClick={() => setSignIn(true)}
                                    className='loginScreen__getStarted'>
                                    GET STARTED
                                </button>
                            </form>
                        </div>
                    </>
                )

                }
                { }

            </div>
        </div>
    )
}

export default LoginScreen
