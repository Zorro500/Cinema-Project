import { useLoaderData, Link } from "react-router-dom";
import styles from '../Movie/Movie.module.css'
import { useContext, useState, useEffect } from "react";
import { top } from "../../utils/FormatDate";
import { contextAutoriz, contextHistory } from "../../components/Layout/Layout";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Movie() {
    const { setHistory } = useContext(contextHistory);
    const { enter } = useContext(contextAutoriz);

    const [valueFilms, setValueFilms] = useState({
        genre: 'all',
        countries: 'all',
        years: 'all',
    });
    const [sortFilmClick, setSortFilmClick] = useState(false);

    const arryFilms = useLoaderData();
    const [films, setFilms] = useState(arryFilms.films);
    const [page, setPage] = useState(2);

    // Состояния для фильтров
    const [genr, setGenr] = useState([]);
    const [country, setCountry] = useState([]);
    const [years, setYears] = useState([]);

    // Пересчёт фильтров при изменении films
    useEffect(() => {
        const newGenr = [];
        const newCountry = [];
        const newYears = [];

        for (let i = 0; i < films.length; i++) {
            if (!newYears.includes(films[i].year)) {
                newYears.push(films[i].year);
            }
            for (let a = 0; a < films[i].countries.length; a++) {
                if (!newCountry.includes(films[i].countries[a].country)) {
                    newCountry.push(films[i].countries[a].country);
                }
            }
            for (let j = 0; j < films[i].genres.length; j++) {
                if (!newGenr.includes(films[i].genres[j].genre)) {
                    newGenr.push(films[i].genres[j].genre);
                }
            }
        }

        setGenr(newGenr);
        setCountry(newCountry);
        setYears(newYears.sort((a, b) => b - a));
    }, [films]);

    const loaderMore = async () => {
        const data = await top(page);
        setFilms([...films, ...data.films]);
        setPage(page + 1);
    }

    function Default() {
        setValueFilms({
            genre: 'all',
            countries: 'all',
            years: 'all'
        });
        setSortFilmClick(false);
    }

    const filmsFilter = films.filter(film => {
        let toCountry = true;
        let toGenre = true;
        let toYear = true;

        if (valueFilms.genre && valueFilms.genre !== 'all') {
            toGenre = film.genres.some(g => valueFilms.genre === g.genre);
        }

        if (valueFilms.countries && valueFilms.countries !== 'all') {
            toCountry = film.countries.some(c => valueFilms.countries === c.country);
        }
        if (valueFilms.years && valueFilms.years !== 'all') {
            toYear = film.year === valueFilms.years;
        }
        return toCountry && toGenre && toYear;

       
    });

    const sortFilmsFilter = [...filmsFilter].sort((a, b) => {
        if (sortFilmClick) {
            return b.rating - a.rating;
        }
        return 0;
    });

    const addHistory = (film) => {
        setHistory(prev => ([...prev, {
            filmId: film.filmId,
            poster: film.posterUrlPreview,
            rating: film.rating,
            name: film.nameRu,
            age: film.age ? parseInt(film.age.replace("age", "")) : null,
            timestamp: new Date().toISOString(),
            displayDate: new Date().toLocaleDateString(),
            displayTime: new Date().toLocaleTimeString()
        }]));
    };

     console.log(films);

    return (
        <div>
            <h1>Фильмы</h1>
            <div className={styles['movie-container']}>
                <button 
                    className={styles['sortBlock']} 
                    value={valueFilms.rating} 
                    onClick={(e) => { 
                        setValueFilms(prev => ({ ...prev, rating: e.target.value })); 
                        setSortFilmClick(true);
                    }}
                >
                    По рейтингу
                </button>
                
                <select 
                    className={styles['sortBlock']} 
                    name="geners" 
                    value={valueFilms.genre} 
                    onChange={(e) => setValueFilms(prev => ({ ...prev, genre: e.target.value }))}
                >
                    <option value="all">Все жанры</option>
                    {genr.map(item => (
                        <option value={item} key={item}>{item}</option>
                    ))}
                </select>
                
                <select 
                    className={styles['sortBlock']} 
                    name="country" 
                    value={valueFilms.countries} 
                    onChange={(e) => setValueFilms(prev => ({ ...prev, countries: e.target.value }))}
                >
                    <option value="all">Все страны</option>
                    {country.map(countri => (
                        <option value={countri} key={countri}>{countri}</option>
                    ))}
                </select>
                
                <select 
                    className={styles['sortBlock']} 
                    name="years" 
                    value={valueFilms.years} 
                    onChange={(e) => setValueFilms(prev => ({ ...prev, years: e.target.value }))}
                >
                    <option value="all">Все года</option>
                    {years.map(year => (
                        <option value={year} key={year}>{year}</option>
                    ))}
                </select>

                <button className={styles['sortBlock']} onClick={Default}>Сброс</button>
            </div>
            
            <Swiper
                spaceBetween={50}
                slidesPerView={4}
                modules={[Navigation]}
                navigation
                className={styles["container-card-container"]}
            >
                {sortFilmsFilter.map(film => (
                    <SwiperSlide key={film.filmId} className={styles["container-card-film"]}>
                        <Link
                            to={`/movieCard/${film.filmId}`}
                            className={styles['movieLink']}
                            onClick={() => enter ? addHistory(film) : ''}
                        >
                            <div className={styles["rating"]}>{film.rating}</div>
                            <h1>{film.nameRu}</h1>
                            <img src={film.posterUrlPreview} alt="img" />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Кнопка загрузки ещё */}
            <button onClick={loaderMore} className={styles["loadMoreBtn"]}>Больше фильмов</button>

            <div className={styles['svg']}>
                <img src={`${import.meta.env.BASE_URL}img/popcorn-svgrepo-com.svg`} alt="#" />
                <div>
                    <h1>Добро пожаловать в КиноПортал</h1>
                    <p>Ваш проводник в мире кино. Смотрите, оценивайте и находите лучшие фильмы в одном месте</p>
                </div>
                <button>
                    <Link to={'/now-playing'}>
                        Смотреть Афишу
                    </Link>
                </button>
            </div>
        </div>
    );
}