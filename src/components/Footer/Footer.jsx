import { NavLink } from 'react-router-dom'
import styles from '../Footer/Footer.module.css'

export default function Footer(){
    return(
        <footer>
            <div className={styles['footer-container']}>

 <div className={styles['footer-kontent']}>
        <p>2026</p>
        <NavLink>Поддержка</NavLink>
        <NavLink>Политика конфиденциальности</NavLink>
       </div>
       <div className={styles['footer-kontent']}>
        <a href="">VK</a>
        <a href="">TG</a>
        <a href="">Youtube</a>
       </div>

            </div>
      
        </footer>
    )
}