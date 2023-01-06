import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Nav.css'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'

function Nav() {
    // This show variable will determine whether the nav bar is visible or not
    const [show, handleShow] = useState(false);

    const history = useHistory()

    //This function will be used to control the transition
    const transitionNavBar = () => {
        //If the window scroll more than 100 then...
        if (window.scrollY > 100) {
            handleShow(true);
        }
        else {
            handleShow(false);
        }
    }
    // useEffect takes a function as an argument
    useEffect(() => {
        // This means that everytime we scroll the window will listen to that event,
        //and trigger the transitionNavBar function
        window.addEventListener("scroll", transitionNavBar);

        //Inside the useEffect we'll cleanup, that is, it'll remove the function attached
        //We don't always need the cleanup, but it is a good practice.
        return () => window.removeEventListener('scroll', transitionNavBar);
    }, [])

    return (
        // Here, the expression: "${show && "nav__black"}" means: Only apply the nav__black
        //style when the show variable is true
        <div className={`nav ${show && "nav__black"}`}>
            <div className="nav__contents">
                <img
                    onClick={() => history.push('/')}
                    className='nav__logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png'
                    alt='Netflix, Public domain, via Wikimedia Commons'
                    attribution='https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png'
                />
                <div className='nav__profileAndAbout'>
                    <img
                        onClick={() => history.push('/profile')}
                        className='nav__avatar'
                        src='https://firebasestorage.googleapis.com/v0/b/facebook-clone-f94bd.appspot.com/o/RCCCsAvatar.jpeg?alt=media&token=73bdaa14-e081-4bd4-b971-778b39f11ea7'
                        alt='RCCCs Avatar'
                        attribution='RCCCs phone Bitmoji app'
                    />
                    <ContactSupportIcon
                        className='nav__about'
                        onClick={() => history.push('/about')}
                    />
                </div>
            </div>
        </div>
    )
}

export default Nav
