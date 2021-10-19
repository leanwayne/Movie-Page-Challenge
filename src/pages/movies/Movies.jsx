import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleContent from '../../components/singleContent/SingleContent';
import '../trending/Trending.css';
import CustomPagination from '../../components/pagination/CustomPagination';
import Genres from '../../components/Genres/Genres';
import UseGenre from '../../hooks/UseGenre';
import StarsRating from '../../components/starsFilter/StarsRating'

const Movies = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreForURL = UseGenre(selectedGenres);
    const [rating, setRating] = useState(0);

    const getMoviesData = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`);
        const result = rating? (data.results.filter(movie => movie.vote_average >= (rating * 2) - 2 && movie.vote_average <= rating * 2)) : (data.results);
        setContent(result);
        setNumOfPages(data.total_pages);
    }

    useEffect(() => {
        window.scroll(0, 0);
        getMoviesData();
    }, [page, genreForURL, rating]);

    return (
        <div>
            <span className='pageTitle'>Discover Movies</span>
            <Genres 
                type='movie' 
                selectedGenres={selectedGenres} 
                setSelectedGenres={setSelectedGenres} 
                genres={genres} 
                setGenres={setGenres}
                setPage={setPage} 
            />
            <StarsRating setRating={setRating} rating={rating}/>
            <div className='trending'>
                {content && content.map(c => 
                    <SingleContent 
                        key={c.id} 
                        id={c.id} 
                        poster={c.poster_path} 
                        title={c.title || c.name} 
                        date={c.first_air_date || c.release_date} 
                        media='movie' 
                        vote_average={c.vote_average}
                    />
                )}
            </div>
            {numOfPages > 1 && (<CustomPagination setPage={setPage}numOfPages={numOfPages}/>)}
        </div>
    )
}
export default Movies;