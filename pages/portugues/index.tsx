import styles from './style.module.css'

const Portugues = () => {
    return (
        <div className={styles.home}>
            <a href="./portugues/crase"><button className={styles.button}>Crase</button></a>
            <a href="./portugues/crase"><button className={styles.button}>Porquês</button></a>
        </div>
    )
}

export default Portugues;