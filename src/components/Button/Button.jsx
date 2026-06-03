import styles from './Button.module.css' ;

export default function Button({
    text,
    size ,
    variant ,
    onclick,
    id,
    disabled
}){
    return <button disabled = {disabled} onClick={onclick} className={`${styles[variant]} ${styles[size]}`} id={id}>{text}</button>
}