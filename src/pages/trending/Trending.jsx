import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleContent from '../../components/singleContent/SingleContent';
import './Trending.css';
import CustomPagination from '../../components/pagination/CustomPagination';

const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);

    const getTrendingData = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        setContent(data.results);
    }

    useEffect(() => {
        window.scroll(0, 0);
        getTrendingData();
    }, [page]);

    return (
        <div>
            <span className='pageTitle'>Trending Today</span>
            <div className='trending'>
                {content && content.map(c => 
                    <SingleContent 
                        key={c.id} 
                        id={c.id} 
                        poster={c.poster_path} 
                        title={c.title || c.name} 
                        date={c.first_air_date || c.release_date} 
                        media={c.media_type} 
                        vote_average={c.vote_average}
                    />
                )}
            </div>
            <CustomPagination setPage={setPage}/>
        </div>
    )
}
export default Trending;