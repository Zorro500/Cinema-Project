import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { contextHistory } from "../../components/Layout/Layout" ;
import styles from '../History/History.module.css'

export default function History(){
    const {history,setHistory} = useContext(contextHistory) ;
    const [sortType,setSortType] = useState('new') ;

    const sortHistory = [...history] ;
    if(sortType === 'new'){
sortHistory.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }else if(sortType === 'old'){
sortHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    
    return(
<div className={styles["container"]}>
<h1>История просмотров</h1>
<div className={styles["sortContainer"]}>
    <button className={styles["sort"]} onClick={()=>setSortType('new')}>Недавние просмотры</button>
    <button className={styles["sort"]} onClick={()=>setSortType('old')}>Старые просмотры</button>
<button onClick={()=>setHistory([])} className={styles["sort"]}>Очистить историю</button>
</div>

{sortHistory.map(filmHistory=>(
    <Link key={filmHistory.filmdId || filmHistory.kinopoiskId} to={`/movieCard/${filmHistory.filmId || filmHistory.kinopoiskId}`} className={styles['linkFavorit']}>
    <div className={styles["histaryCard"]}>
         <img src={filmHistory.poster} alt="img" />
    <div >
    <div className={styles["rating"]}>{filmHistory.rating}</div>
   <h1>{filmHistory.name}</h1> 
    </div>
    <div>
    <p>Дата посещения : {filmHistory.displayTime}</p>
    <p>Время посещения : {filmHistory.displayTime}</p>
    </div>
    </div>
    </Link>
))}
        </div>
    )
}