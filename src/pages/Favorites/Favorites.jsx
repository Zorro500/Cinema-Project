import { useContext } from "react";
import { contextFavorite } from "../../components/Layout/Layout";
import styles from '../Favorites/Favorites.module.css';
import { Link } from "react-router-dom";

export default function Favorites() {
  const { arrFavorite, setArrFavorite } = useContext(contextFavorite);

  if (!arrFavorite || arrFavorite.length === 0) {
    return (
    <>
    <h1>Избранное</h1>
    <div className={styles["no-favorite"]}>Вы пока не добавили фильм в избранное...</div>
    </>)
    
    
  }

  return (
    <>
      <h1>Избранное</h1>
      <div className={styles["favoriteblock"]}>
        {arrFavorite.map(favorite => (
          <div key={favorite.filmId} className={styles["favoriteCard"]}>
            <Link to={`/movieCard/${favorite.filmId}`} className={styles['linkFavorit']}>
              <div className={styles['rating']}>{favorite.rating ? favorite.rating : '-'}</div>
              <img src={favorite.poster} alt={favorite.name} />
              <h2>{favorite.name}</h2>
              <p>Возраст : {favorite.age ? `${favorite.age}+` : '-'}</p>
            </Link>
            <button className={styles['btnDelete']} onClick={() => {
              setArrFavorite(prev => prev.filter(f => f.filmId !== favorite.filmId));
            }}>
              Удалить
            </button>
          </div>)
        )}
      </div>
    </>
  );
}