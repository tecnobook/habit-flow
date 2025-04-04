import Botao from '@/components/button';
import styles from './style.module.css'

const Portugues = () => {
    return (
        <div className={styles.home}>
            <a href="./portugues/crase">
                <Botao name={'Crase'} />
            </a>
            <a href="./portugues/crase">
                <Botao name={'Porquês'}/>
            </a>
        </div>
    )
}

export default Portugues;