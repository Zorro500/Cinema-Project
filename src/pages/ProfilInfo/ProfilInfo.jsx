import { users } from "..//..//utils/users"
import styles from '../ProfilInfo/ProfilInfo.module.css'

export default function ProfilInfo(){
    return(
        <>
        <div className={styles["profInf"]}>
        <h2>Информация о пользователе</h2>
        <div className={styles['us-inf']}>
        <img src={users.avatar} alt="img" />
        <div>
        <p>Имя {users.firstName}</p>
        <p>Фамилия {users.lastName}</p>
        <p>Дата регестрации {users.registrationDate}</p>
        </div>
  
        </div>       
        </div>
        </>
        
        


    )
}