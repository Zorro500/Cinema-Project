import { useContext } from 'react';
import { contextAutoriz } from '../Layout/Layout';
import styles from '../ProfilLayout/ProfilLayout.module.css'
import { NavLink,Outlet } from "react-router-dom"


export default function Profil(){
    

    const {setAutoriz,enter,setEnter} = useContext(contextAutoriz) ;
    return(
        <>
        <div className={styles["profilPage"]}>
            <div className={styles["profilContainer"]}>
  <div className={styles["navigation"]}>
            <NavLink className={({ isActive }) => isActive  ? styles['active'] : styles['NavLink']} to={'/profil'}>Личный кабинет</NavLink>
            <NavLink className={({ isActive }) => isActive  ? styles['active'] : styles['NavLink']} to={"favorites"}>Избранное</NavLink>
            <NavLink className={({ isActive }) => isActive  ? styles['active'] : styles['NavLink']} to={'history'}>История</NavLink>
            <NavLink className={({ isActive }) => isActive  ? styles['active'] : styles['NavLink']} onClick={()=>{setAutoriz(false);setEnter(false)}} to={'/home'}>Выйти</NavLink>
        </div>
        <div className={styles['outletProf']}>
            {enter 
            ?
            <Outlet />
            :
            <p>Вы вышли из своей учетной записи</p>
            }
            
        </div>
        </div>
            </div>
      
    </>
    )
}