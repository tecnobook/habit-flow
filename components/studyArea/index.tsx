import Botao from '../button';
import styles from './style.module.css'

const links = [
    { nome: 'Portugues', link: '/portugues' },
    { nome: 'Matematica', link: '/matematica' },
]

const StudyArea = () => {
    return (
        <div className={styles.page}>
            <h1 className={styles.h1}>Area de Estudo</h1>
            <div className={styles.linksArea}>
                {links.map((item, index) => (
                    <a href={item.link} key={index}>
                        <Botao name={item.nome} />
                    </a>

                ))}
            </div>
        </div>
    )
}

export default StudyArea;