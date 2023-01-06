//Typically we would store this key in {process.env.API_KEY}
const API_KEY = 'd337ddff766e59f2887de005c5af5fe0';

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
}

//We can find more requests links by category in the TMDB API documentation section:
//https://developers.themoviedb.org/3/getting-started/introduction

//Notice that the base URL: "https://api.themoviedb.org/3" is defined in axios.js
//for example the request for fetch trending would be as follows:
//"https://api.themoviedb.org/3/trending/all/week?api_key=d337ddff766e59f2887de005c5af5fe0&language=en-US"

export default requests;