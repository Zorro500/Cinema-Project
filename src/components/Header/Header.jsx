import { NavLink } from 'react-router-dom';
import styles from'../Header/Header.module.css' ;
import { contextSearch,contextAutoriz} from '../Layout/Layout';
import { useContext } from 'react';




export default function Header(){
const {setClickSearch} = useContext(contextSearch)
const {setAutoriz,enter,setEnter} = useContext(contextAutoriz) ;

    return(
        <header>
            <div className={styles['divLogo']}>
       <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="logo" />
        <h3>КиноПортал</h3>
            </div>
        <div>
            <NavLink className={({isActive})=> isActive ?  styles['active']: styles['nav-link']} to={'home'}>Главная</NavLink>
            <NavLink className={({isActive})=> isActive ?  styles['active']: styles['nav-link']} to={'now-playing'}>Афиша</NavLink>
            <NavLink className={({isActive})=> isActive ?  styles['active']: styles['nav-link']} to={'coming-soon'}>Новости</NavLink>
            <NavLink className={({isActive})=> isActive ?  styles['active']: styles['nav-link']} to={`/movie/2`}>Фильм</NavLink>
           <NavLink className={({isActive})=> isActive ?  styles['active']: styles['nav-link']} to={'search'} onClick={()=>setClickSearch(true)}>Поиск</NavLink>
        </div>
        <NavLink className={({isActive})=> isActive ?  styles['active']: styles['nav-link']} to={enter ? 'profil' : 'authorization'} onClick={!enter ?()=>setAutoriz(true): ''}>{enter? "Кабинет" : "Войти в личный кабинет"}</NavLink>
        </header>
    )
}