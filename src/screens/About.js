import React from 'react'
import Nav from '../Nav'
import './About.css'
import { useHistory } from 'react-router-dom'

function About() {
    const history = useHistory();
    return (
        <div className='about'>
            <Nav />
            <div className="about__title">
                <h1>Netflix-like portal made in ReactJS ⚛</h1>
                <h2 className="about__h2">2021 - Made by RCCC 😎 for testing, and practice purposes only.</h2>
                <h2 className="about__h2">Brief Description:</h2>
                <p className='about__p'>This application was developed with the purpose of making a UI similar
                    to Netflix by implementing ReactJs components, Redux, Firebase,
                    as well as other react hooks and components.
                    The movie posters, thumbnails, and descriptions are dynamically retrieved from TMDB
                    through its API and react-axios component.
                    The movies are classified by the following categories: Netflix Originals, trending,
                    top rated, action, comedy, horror, romance, and documentaries.
                    There is also the functionality to watch the corresponding YouTube trailers when
                    clicking on a thumbnail, (as long as the corresponding movie has an
                    associated trailer specified in the TMDB database). It is fully responsive,
                    since components are arranged applying flexbox layout. Every time the page is
                    refreshed., the banner at the top displays a random movie along with its
                    description. Users can sign in and sign out, and there is a profile section
                    (accessed by clicking on the avatar icon) in
                    which the user information is displayed along with the current plan and
                    available plans to upgrade.</p>
                <h2 className="about__h2">Components and libraries used:</h2>
                <p className="about__p">The following components and libraries were used:</p>
                <h2 className='about__h2'></h2>
                <ul>
                    <li>
                        <span className="about__bold">Redux:</span> A library for managing and updating global application state.
                        In this implementation, Redux is used to maintain registered user access
                        throughout the application, so that every time the page is refreshed or
                        the user closes the window and opens it again, the current user is
                        retrieved from the data layer until the user logs out.
                    </li>
                    <li>This product uses the <a href='https://www.themoviedb.org/documentation/api' target='_blank'>TMDB API</a>, but is not endorsed or certified by TMDB, to recover the images and descriptions of the movies.</li>
                    <li>To access the TMDB API we use <span className="about__bold">react-axios</span>, which is a react component used to make async requests to external resources. </li>
                    <li>In addition, the following feacutres and react-components were also used:</li>
                    <ol>

                        <li>
                            <span className="about__bold">React-YOutube:</span> React component acting as a thin layer over the YouTube IFrame Player AP.I</li>
                        <li><span className="about__bold">Movie-trailer:</span> React component with which we can search for movie trailers from a given movie name or a given TMDB movie ID. In this case the movies are searched by TMDB movie ID.</li>
                        <li>R<span className="about__bold">react-router-dom:</span> React Router is a library that contains a collection of navigational components and
                            tools with which we can navigate through different React components and
                            views in a React application, allows changing the browser URL
                            and keeps the UI in sync with the URL.
                        </li>
                        <li><span className="about__bold">Firebase CLI (firebase-tools):</span> The firebase Command Line Interface
                            (CLI) Tools were used to test, manage, and deploy the project to Firebase,
                            as well as interact with the Firebase database to store de user info associated with its subscription;
                            import/export users into/from Firebase auth.
                        </li>
                        <li><span className="about__bold">Firebase email authentication:</span> Users can register and login with their emails
                            in order to access the application.
                        </li>
                        <li><span className="about__bold">Material-ui and Material-ui-icons:</span> A
                            library with diverse reusable components and icons to create the UI in
                            React applications . In this implementation
                            the Modal component is used to display the youtube videos and pop up messages.
                        </li>
                    </ol>
                </ul>
                <h3 className='about__attributionsTitle'>Attributions:</h3>
            </div>
            <div className="about__attributions">
                <div className='about__tmdb'>
                    <h2 className='about__h2'>Movies and TV Series pictures and posters obtained from: </h2>
                    <img
                        src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg'
                        className='about__tmdbLogo'
                        onClick={() => { window.open('https://www.themoviedb.org/', '_blank') }}
                    />
                </div>
                <div className='about__descriptionWithLinks'>
                    <h2 className="about__h2">Netflix logo obtained from: </h2>
                    <a href="https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png" target='_blank'>Netflix, Public domain, via Wikimedia Commons</a>
                </div>
            </div>
        </div>
    )
}

export default About
