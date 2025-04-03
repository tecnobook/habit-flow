import { useEffect, useState } from "react";
import styles from './style.module.css'

interface Jogador {
    nome: string;
    xp: number;
    pontos: number;

    for: number;
    def: number;
    vel: number;
    int: number;
    log: number;
    pow: number;
    hax: number;
}

const Perfil = () => {

    const [dados, setDados] = useState<Jogador[]>([]);
    const [isClient, setIsClient] = useState<boolean>(false);

    // Definindo o estado com base no localStorage apenas após o lado do cliente ser montado
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsClient(true);
            const storedData = localStorage.getItem("dados");
            if (storedData) {
                setDados(JSON.parse(storedData));
            } else {
                // Valor padrão caso não haja dados no localStorage
                setDados([
                    { nome: "Daniel", xp: 0, pontos: 0, for: 0, def: 0, vel: 0, int: 0, log: 0, pow: 0, hax: 0 },
                ]);
            }
        }
    }, []);

    // Exibir uma tela de carregamento enquanto os dados não são carregados no cliente
    if (!isClient) {
        return <div>Carregando...</div>;
    }
    return (
        <div className={styles.nav}>
            <a href="/"><h3>{dados[0].nome}</h3></a>
            <p>XP: {dados[0].xp}</p>
            <p>Pontos: {dados[0].pontos}</p>
            <div className={styles.local}>
                <a href="/perfil"><button className={styles.perfil}>Perfil</button></a>
                <a href="/loja"><button className={styles.perfil}>Loja</button></a>
            </div>
        </div>
    )
}

export default Perfil;