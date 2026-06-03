import { useLoaderData } from "react-router-dom"
import styles from  '../ComingSoon/ComingSoon.module.css'

export default function ComingSoon(){
    const loadNews = useLoaderData() ;
    console.log(loadNews.items) ;
    return(
        <div className={styles["newsContainer"]}>
        <h1>Новости в мире кино</h1>
        
            
{
    loadNews.items.map(item=>(
        <div className={styles["newsCard"]}>
            <img src={item.imageUrl} alt="img" />
            <div>
                <h3>{item.title}</h3>
             <p>
                {item.description}
                <a href={item.url}>Подробнее...</a>
            </p>
            </div>
           
        </div>
    ))
}
            </div>
            
    )
}