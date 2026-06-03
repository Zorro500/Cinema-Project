import { Link, useNavigate } from "react-router-dom";
import Button from '../../components/Button/Button';
import styles from '../Authorization/Authorization.module.css';
import { useContext } from "react";
import { contextAutoriz } from "../../components/Layout/Layout";

export default function Authorization() {
    const { autoriz, setAutoriz, setEnter } = useContext(contextAutoriz);
    const navigate = useNavigate();

    const handleClose = () => {
        setAutoriz(false);
        navigate('/home');
    };

    return (
        <>
            {autoriz && (
                <div className={styles["authoriz-owerflou"]}>
                    <div className={styles["container-authoriz"]}>
                        {/* Крестик - закрывает окно и переходит на home */}
                        <button 
                            type="button"
                            className={styles["close-btn"]}
                            onClick={handleClose}
                        >
                            ×
                        </button>
                        <h1>Авторизация</h1>
                        <div>
                            <label>Email :</label>
                            <input type="email" placeholder="Введите email" />
                        </div>
                        <div>
                            <label>Пароль :</label>
                            <input type="password" placeholder="Введите пароль" />
                        </div>
                        <Link to={'/profil'} onClick={() => { setEnter(true); setAutoriz(false); }}>
                            <Button text={'Войти'} variant={'login-button'} />
                        </Link>
                        <Link className={styles['link-autoriz']}>Забыли пароль ?</Link>
                        <Link className={styles['link-autoriz']}>Зарегистрироваться</Link>
                    </div>
                </div>
            )}
        </>
    );
}