import { useContext, useState } from 'react';
import styles from '../MovieCard/MovieCard.module.css'
import { useLoaderData} from "react-router-dom";
import Button from '../../components/Button/Button';
import { contextAutoriz, contextFavorite} from '../../components/Layout/Layout';
import toast from 'react-hot-toast';



import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function MovieCard(){
    const {enter} = useContext(contextAutoriz)
    const {arrFavorite, setArrFavorite} = useContext(contextFavorite) 
    const [countActers, setCountActers] = useState({
        start: 0,
        end: 10
    });
    
    const { film, trailers, urlFilms, akters } = useLoaderData();

    const age = film.ratingAgeLimits; 
    const ageNumber = parseInt(age.replace("age", ""));

    // Проверка, есть ли фильм в избранном
    const isFavorite = arrFavorite.some(f => f.filmId === film.kinopoiskId);

    // Функция добавления/удаления
    const toggleFavorite = () => {
        if (isFavorite) {
            setArrFavorite(prev => prev.filter(f => f.filmId !== film.kinopoiskId));
            toast.success('Удалено из избранного');
        } else {
            setArrFavorite(prev => [...prev, {
                filmId: film.kinopoiskId,
                poster: film.posterUrlPreview,
                rating: film.ratingKinopoisk,
                name: film.nameRu,
                age: film.ratingAgeLimits ? parseInt(film.ratingAgeLimits.replace("age", "")) : null,
                platform: urlFilms
            }]);
            toast.success('Добавлено в избранное');
        }
    };

    const aktersLength = akters.slice(countActers.start, countActers.end);

    return(
        <>
        <div className={styles["container"]}>
            <div className={styles["movieCard"]}>
                <div>
                    <img src={film.posterUrlPreview} alt="img" />
                </div>
                <div>
                    <div className={styles['ratingFavoritblock']}>
                        <div className={styles['rating']}>
                            {film.ratingKinopoisk}
                        </div>
                        <Button 
                            variant={isFavorite ? 'btnAddFavoriteClick' : 'btnAddFavorite'} 
                            text={isFavorite ? '❤' : '♡'} 
                            onclick={() => {
                                if (!enter) {
                                    toast.error('Войдите в свою учетную запись');
                                    return;
                                }
                                toggleFavorite();
                            }} 
                        />
                    </div>
                    <h1>{film.nameRu}</h1>
                    <h2>{film.nameEn && `(${film.nameEn})`}</h2>
                    <h3>О фильме :</h3>
                    <p>Год : {film.year}</p>
                    <p>Страна: {film.countries.map(coutry=> coutry.country).join(',')}</p>
                    <p>Жанр: {film.genres.map(genre=> genre.genre).join(',')}</p>
                    <p>Длительность фильма : {film.filmLength ? film.filmLength : '---'}</p>
                    <p>Слоган : {film.slogan}</p>
                    <p>{`Возраст : ${ageNumber}+`}</p>
                    <div>
                        <p>Описание : </p>
                        <p>{film.description}</p>
                    </div>
                   {trailers.items.length > 14 && trailers.items[14]?.url &&
    <div className={styles['trailer']}>
        <a href={trailers.items[14].url}>Трейлер</a>
    </div>
}
                    <p>Смотреть на : </p>
                    <div className={styles['urlFilmContainer']}>
                        {urlFilms.items.map(urFilm=>(
                            <div key={urFilm.platform} className={styles['urlFilms']}>
                                <a href={urFilm.url}>
                                    <img src={urFilm.logoUrl} alt="img" />
                                    {urFilm.platform}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles['aktersContainer']}>
            <Swiper spaceBetween={2} slidesPerView={5}  modules={[Navigation]}
  navigation>
{aktersLength.map(akter=>(
                    <SwiperSlide key={akter.staffId} className={styles['akters']}>
                        <img src={akter.posterUrl} alt="img" />
                        <p>{akter.nameRu}</p>
                        <p>{akter.professionText}</p>
                    </SwiperSlide>   
                ))}
            </Swiper>       
            </div>       
        </div>

        </>

        
    )
}