//Here, we must take care to import from the local axios file ('./axios') instead from
//the global axios ('axios') library
import axios from './axios';
import React, { useEffect, useState } from 'react'
import './Banner.css'
import requests from './Requests';

function Banner() {

    //We initialize the value with an empty array
    const [movie, setMovie] = useState([]);

    //This array contains the movie ids that are forbidden. That is those movies like that
    //TV series which name is the "enemy's other name which doesn't deserve to be mentioned"
    //or any other evil tv series that goes against God or encourages to do evil things 
    //or participate in evil things
    const forbidenIds = [63174, 126280, 79242, 440249, 381749, 24593, 61927, 685264, 318256, 81356]

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            //Set a random movie
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );

            //console.log('theId:>>>', movie?.id)

            return request;
        }

        fetchData();

    }, []);

    console.log('themovie: >>>', movie)

    // This function is used to truncate the text when it is too long
    //n is the number of characteres
    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }
    return (
        //Test Background image: https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg
        // attribution: 
        //https://commons.wikimedia.org/wiki/File:Netflix_logo.svg
        <header className='banner' style={{
            backgroundSize: 'cover',
            backgroundImage: forbidenIds.includes(movie?.id) ?
                `url(https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg)` :
                `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
            backgroundPosition: 'center center',
        }}>

            <div className="banner__contents">
                <h1 className="banner__title">{forbidenIds.includes(movie?.id) ? 'Movie Title' : (movie?.title || movie?.name || movie?.original_name)}</h1>
                <div className="banner__buttons">
                    <button className='banner__button' >Play</button>
                    <button className='banner__button'>My List</button>
                </div>
                <h1 className="banner__description">
                    {/* here we use backticks ` instead of quotes ' or double quotes " in order to 
                    be able to encapsulate the whole string inside multiple lines " */}
                    {forbidenIds.includes(movie?.id) ? '' : truncate(movie?.overview, 150)}
                </h1>
                <h1 className="banner__instructions">Click or tap on a movie thumbnail to watch the YouTube trailer.</h1>
            </div>
            {/* This is used to give a nice fade */}
            <div className="banner--fadeBottom" />

        </header>
    )
}

export default Banner
