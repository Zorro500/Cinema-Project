import { useContext, useState } from 'react';
import styles from'../Search/Search.module.css' ;
import { contextAutoriz, contextHistory, contextMovieCard, contextSearch } from '../../components/Layout/Layout';
import Button from '../../components/Button/Button'
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';

export default function Search(){
    const {setClickSearch, clickSearch} = useContext(contextSearch);
    const {setArryMovieCard} = useContext(contextMovieCard) ;
    const {history,setHistory} = useContext(contextHistory) ;
    const {enter} = useContext(contextAutoriz)

    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState('');


    
    const searchFilms = useLoaderData();
    console.log("1. Что пришло из API:"  , searchFilms.films);

    const handleSearch = (value) => {
        if (value.trim()) {
            setSearchParams({ keyword: value });

        } else {
            setSearchParams({});
          
        }
    };
const historySearch=(film)=>{
        setHistory(prev=>([...prev,{
        filmId: film.filmId,
        poster: film.posterUrlPreview,
        rating: film.rating,
        name: film.nameRu,
        age: film.age ? parseInt(film.age.replace("age", "")) : null,
        timestamp: new Date().toISOString(),
        displayDate: new Date().toLocaleDateString(),
        displayTime: new Date().toLocaleTimeString()

    }])) ;
}

 
    return(
        <>
            {clickSearch && (
                <div className={styles["owerlou"]}>
                    <h1>Поиск фильмов и сериалов</h1>
                    <div className={styles['search-container']}>
                        <input 
                            type="text" 
                            placeholder='Введите название фильма' 
                            className={styles['search-input']} 
                            value={query} 
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setQuery(newValue);
                                handleSearch(newValue);
                            }}
                        /> 

                        <Link to={'/home'}>
                         <Button 
                            variant='btn-close-searche' 
                            onclick={() => setClickSearch(false)} 
                            text='&times;'
                        /> 
                        </Link>
                       
                    </div>
                    {
                        query &&
                         <div className={styles['serchFilmsContainer']}>
                        {searchFilms.films.map(film=>(
                            <Link to={`/movieCard/${film.filmId}`} onClick={()=>{setArryMovieCard(film) ;enter? historySearch(film):''}}><img src={film.posterUrlPreview} alt={film.nameRu} /></Link> 
                        
                    ))}
                    </div>
                    }
                   
                </div>
            )}  
        </>
    )
}
