import React, { useState, useEffect } from 'react'
import './Row.css'
import axios from './axios'
import ModalVideo from './ModalVideo'
import movieTrailer from 'movie-trailer'

//This array contains the movie ids that are forbidden. That is those movies like that
//TV series which name is the "enemy's other name which doesn't deserve to be mentioned"
//or any other evil tv series that goes against God or encourages to do evil things 
//or participate in evil things
const forbidenIds = [63174, 126280, 79242, 440249, 381749, 24593, 61927, 685264, 318256, 81356]

// isLargeRow = false -->Means that by default it's gonna be false.
function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [youtubeMovieId, setYoutubeMovieId] = useState('');

    const handleOpen = (movieId) => {
        console.log('TMDB ID:>>>', movieId);

        //Recover the movie trailer url
        movieTrailer(null, { tmdbId: movieId })
            .then(response => {
                console.log('The youtube link: >>>>', response)
                if (response) {
                    // console.log('The index:>>>>', response.lastIndexOf('='))
                    let id = response.slice(response.lastIndexOf('=') + 1)
                    setYoutubeMovieId(id);
                    console.log('The movie ID-TheObtainedId:>>>>>', youtubeMovieId, '-', id)
                    // Now, that we have the response, we can set the openModal variable to true
                    // setOpenModal(true);
                }
                else {
                    console.log('Trailer not FOUND----------');
                    setYoutubeMovieId(null);
                }
                //Set openModal = true regardless the video Id is null. Anyways, 
                //the Modal video component will determine wheter to show a video or
                //  to show a message indicating that the trailer was not found
                setOpenModal(true);

            });

        //RCCC: 👆🏻👆🏻👆🏻Instead of using promises, we can declare this handleOpen function as async
        //and then call the movieTrailer function with the await keyword before it and then
        //use the response value just after calling the function in the same way we'd use it 
        //if it were not a promise like this:
        //let response = await movieTrailer(null, { tmdbId: movieId });
        //if (response) {
        //  let id =....
        //...
        //...


    }

    const base_url = 'https://image.tmdb.org/t/p/original/';



    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);

            //setMovies(request.data.results);

            //RCCC: Filter the results by removing the forbidden ids
            const filteredResults = request.data.results.filter(result => !forbidenIds.includes(result.id));
            setMovies(filteredResults);
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    console.log('the movies: ', movies);
    //Now remove the forbidden movies
    // let filteredMovies = movies.filter(movie => !forbidenIds.includes(movie.id))
    // setMovies(filteredMovies);

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {movies?.map(movie => (
                    // Only render the movies that have images either poster or backdrop. Otherwise avoid showing a dead link
                    ((isLargeRow && movie.poster_path) ||
                        (!isLargeRow && movie.backdrop_path)) &&
                    <div className='row__movieElement'>
                        <img
                            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                            key={movie.id}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                            onClick={() => handleOpen(movie.id)}
                        />
                        <h1 className='row__movieName'>{movie?.title || movie?.name || movie?.original_name}</h1>
                    </div>

                ))}
            </div>
            <ModalVideo videoTitle='title' visible={openModal} ytMovieId={youtubeMovieId} setParentOpenModal={setOpenModal} />
        </div>
    )
}

export default Row
