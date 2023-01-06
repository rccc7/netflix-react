import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';
import About from './screens/About'

function App() {
  //The selector that we defined in features/userSlice which will give the user back
  const user = useSelector(selectUser);
  console.log('The User:>>>', user)

  //When it detects that someone is logged in, then we need to fire the user
  // object into the state so that we can access that user object anywere in
  // the application. 
  //The way we manipulate the state is by dispatching the login/logout action.
  const dispatch = useDispatch();

  useEffect(() => {
    // Here, the function: "auth.onAuthStateChanged(...)" is a listener 
    //that checks whether the user is signed in or out
    //We declare the "unsubscribe" variable in order to cleanup after we checked
    //so that the performance is not gonna be affected.
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        //If the user is logged in
        console.log(userAuth);
        //Here, we are dispatching the login event and we're passing the payload
        //which basically is the user (see the login reducer defined in features/userSlice.js)
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }));
      } else {
        //Logged out: Dispatch the logout action.
        dispatch(logout())
        console.log('logged out')
      }
      //whenever we use the useEffect, we should have a cleanup function:
      //This is equivalent to say: return ()=>{unsubscribe();};
      //This is we don't want to duplicate another listener, we just want to detach the
      //older one and attach a new one.
      return unsubscribe;

    })
  }, [dispatch])

  return (
    <div className="app">
      {/* <h1>Heyyy It's me RCCC 😎! Let's build Netflix</h1> */}
      <Router>
        {!user ? (
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <LoginScreen />

          </Switch>

        ) : (
          <Switch>
            <Route path='/profile'>
              <ProfileScreen />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            {/* The reserved word "exact" is used to make the router render
             only and only if the route is "/". Otherwise, it'll not render anything. 
             Without this restricttion the router would always render the Homescreen 
             when we write a wrong path or a path which is not defined here
            for example: the "/abot" would render to Homescreen */}
            <Route exact path="/">
              <HomeScreen />
            </Route>
          </Switch>
        )}

      </Router>
    </div>
  );
}

export default App;
