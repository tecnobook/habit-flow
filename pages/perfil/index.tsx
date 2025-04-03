import { useEffect, useState } from "react";
import styles from './style.module.css'
import Rank from "@/utils/user";
import Nivel from "@/utils/nivel";

interface Jogador {
    nome: string;
    xp: number;
    pontos: number;

    for: number;
    def: number;
    vel: number;
    int: number;
    con: number;
    log: number;
    pow: number;
    hax: number;
}

const perfil = () => {

    const [dados, setDados] = useState<Jogador[]>([]);
    const [isClient, setIsClient] = useState<boolean>(false);
    const [total, setTotal] = useState(0)
    const [rank, setRank] = useState('')
    const [nivel, setNivel] = useState(1)

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
                    { nome: "Daniel", xp: 0, pontos: 0, for: 0, def: 0, vel: 0, con: 0, int: 1, log: 0, pow: 0, hax: 1 },
                ]);
            }
        }

    }, []);

    // Exibir uma tela de carregamento enquanto os dados não são carregados no cliente
    if (!isClient) {
        return <div>Carregando...</div>;
    }

    const calcTot = () => {
        setTotal(((
            dados[0].for + 
            dados[0].def + 
            dados[0].pow + 
            dados[0].vel +
            dados[0].int + 
            dados[0].log) ** 
            dados[0].hax) / 4)
    }

    const defRank = () => {
        total >= Rank[0].count && total < Rank[1].count ?
        setRank(Rank[0].rank) :
        total >= Rank[1].count && total < Rank[2].count ?
        setRank(Rank[1].rank) :
        total >= Rank[2].count && total < Rank[3].count ?
        setRank(Rank[2].rank) :
        total >= Rank[3].count && total < Rank[4].count ?
        setRank(Rank[3].rank) :
        total >= Rank[4].count && total < Rank[5].count ?
        setRank(Rank[4].rank) :
        total >= Rank[5].count && total < Rank[6].count ?
        setRank(Rank[5].rank) :
        total >= Rank[6].count && total < Rank[7].count ?
        setRank(Rank[6].rank) :
        total >= Rank[7].count && total < Rank[8].count ?
        setRank(Rank[7].rank) : ''
    }

    const defNivel = () => {

        for (let i = 0; i < Nivel.length; i++ ) {

            dados[0].xp >= Nivel[i].xp && dados[0].xp < Nivel[i+1].xp ?
            setNivel(Nivel[i].nivel) : ''
        }

    }

    return (
        <div className={styles.page} onMouseMove={() => (calcTot(), defRank(), defNivel())}>
            <div>
                <h3>{dados[0].nome}</h3>
                <div>Nivel: {nivel}</div>
                <h3>xp: {dados[0].xp}</h3>
                <h3>pontos: {dados[0].pontos}</h3>
            </div>

            <img className={styles.img} src="./ranks/1moegi.png" alt="" />

            <div>
                <h2>Poder</h2>
                <h3>Força: {(dados[0].for).toFixed(0)}</h3>
                <h3>Def: {(dados[0].def).toFixed(0)}</h3>
                <h3>Vel: {(dados[0].vel).toFixed(0)}</h3>
                <h3>Int: {(dados[0].int).toFixed(0)}</h3>
                <h3>Con: {(dados[0].con).toFixed(0)}</h3>
                <h3>Logica: {(dados[0].log).toFixed(0)}</h3>
                <h3>Poder: {dados[0].pow}</h3>
                <h3>Hax: {(dados[0].hax).toFixed(0)}</h3>
                <h2>Total: {total.toFixed(0)}</h2>
                <h1>Rank: {rank}</h1>
            </div>
        </div>
    )
}

export default perfil;