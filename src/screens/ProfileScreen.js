import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import Nav from '../Nav'
import PlansScreen from './PlansScreen'
import './ProfileScreen.css'

function ProfileScreen() {
    //Here, we are going to grab the user from the store.
    const user = useSelector(selectUser);


    return (
        <div className='profileScreen'>
            <Nav />
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img
                        className='profileScreen__avatar'
                        src='https://firebasestorage.googleapis.com/v0/b/facebook-clone-f94bd.appspot.com/o/RCCCsAvatar.jpeg?alt=media&token=73bdaa14-e081-4bd4-b971-778b39f11ea7'
                        alt='RCCCs Avatar'
                        attribution='RCCCs phone Bitmoji app'
                    />
                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen__plans">
                            <PlansScreen />
                            <button
                                // We must call as an arrow function in oder to not make the 
                                //function to be called automatically every time the component is rendered
                                //IMPORTANT: Notice when the user clicks on this button it'll not only call
                                //the auth.signOut() function, but it also will trigger the listener defined 
                                //inside the useEffect() function App.js: "const unsubscribe = auth.onAuthStateChange(...."
                                //because the authentication state changed, which dispatches the logout action
                                onClick={() => auth.signOut()}
                                className="profileScreen__signOut">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
