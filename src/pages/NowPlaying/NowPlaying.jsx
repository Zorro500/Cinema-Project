import { useLoaderData } from "react-router-dom"
import styles from '../NowPlaying/NowPlaying.module.css'
import Button from '../../components/Button/Button'
import { contextAutoriz, contextFavorite } from "../../components/Layout/Layout";
import { useContext} from "react";
import toast from "react-hot-toast";

export default function NowPlayin(){
    const { arrFavorite, setArrFavorite } = useContext(contextFavorite);
    const { enter } = useContext(contextAutoriz);
    const premiers = useLoaderData();

    const isFavorite = (filmId) => arrFavorite.some(f => f.filmId === filmId);

    const toggleFavorite = (film) => {
        if (isFavorite(film.kinopoiskId)) {
            setArrFavorite(prev => prev.filter(f => f.filmId !== film.kinopoiskId));
            toast.success('Удалено из избранного');
        } else {
            setArrFavorite(prev => [...prev, {
                filmId: film.kinopoiskId,
                poster: film.posterUrlPreview,
                rating: film.ratingKinopoisk,
                name: film.nameRu,
                age: film.ratingAgeLimits ? parseInt(film.ratingAgeLimits.replace("age", "")) : null,
            }]);
            toast.success('Добавлено в избранное');
        }
    };

    return(
        <>
        <h1>Список ожидаемых фильмов.</h1>
        <div className={styles["premierContainer"]}>
            {premiers.items.map(film => {
                const favorite = isFavorite(film.kinopoiskId);
                return (
                    <div key={film.kinopoiskId} className={styles["premierCard"]}>
                        <img src={film.posterUrl} alt="img" />
                        <div>
                            <p>{film.premiereRu ? film.premiereRu : 'Даты выхода пока нет'}</p>
                            <h3>{film.nameRu}</h3>
                            <p>{film.countries.map(country=>country.country).join(',')}</p>
                            <p>{film.genres.map(genr=>genr.genre).join(',')}</p>
                        </div>
                        <Button 
                            variant={favorite ? "promisSeePremierActive" : "promisSeePremier"} 
                            text={favorite ? 'В избранном ✓' : 'Буду смотреть'} 
                            onclick={() => {
                                if (!enter) {
                                    toast.error('Войдите в учетную запись');
                                    return;
                                }
                                toggleFavorite(film);
                            }}
                        />
                    </div>
                );
            })}
        </div>
        </>
    );
}