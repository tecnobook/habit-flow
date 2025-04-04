import styles from './style.module.css';

interface Props {
    name: string;
}

const Botao: React.FC<Props> = ({ name }) => {  // Desestruturação de props
    return (
        <div className={styles.button}>
            {name}
        </div>
    );
}

export default Botao;