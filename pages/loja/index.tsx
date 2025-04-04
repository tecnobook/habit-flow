import styles from './style.module.css'

const itens = [
    {nome: 'Imagens gif das cartas de missão'},
    {nome: 'Imagens de fundo'},
    {nome: 'Imagens de bonecos'},
    {nome: 'Cor de fundo das cartas de missão'},
    {nome: 'Imagens do navbar'},
    {nome: 'Estilizações das cartas de missão'},
    {nome: ''},
]

const Loja = () => {
    return (
        <div className={styles.page}>
            <h2>Itens</h2>
            <ul className={styles.itemArea}>
                {itens.map((item, index) => (
                    <li>{item.nome}</li>
                ))}
            </ul>
        </div>
    )
}

export default Loja;