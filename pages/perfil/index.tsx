import { useEffect, useState } from "react";
import styles from './style.module.css';
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

const Perfil = () => {
    const [dados, setDados] = useState<Jogador[]>([]);
    const [isClient, setIsClient] = useState<boolean>(false);
    const [total, setTotal] = useState(0);
    const [rank, setRank] = useState('');
    const [nivel, setNivel] = useState(1);

    // Carregar dados do localStorage após montagem do cliente
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsClient(true);
            const storedData = localStorage.getItem("dados");
            if (storedData) {
                setDados(JSON.parse(storedData));
            } else {
                setDados([{
                    nome: "Daniel", xp: 0, pontos: 0, for: 0, def: 0, vel: 0, con: 0, int: 1, log: 0, pow: 0, hax: 1
                }]);
            }
        }
    }, []);

    // Atualizar total e rank sempre que os dados ou total mudarem
    useEffect(() => {
        if (dados.length > 0) {
            // Calculando o total
            const novoTotal = ((dados[0].for +
                dados[0].def +
                dados[0].pow +
                dados[0].vel +
                dados[0].int +
                dados[0].log) ** dados[0].hax) / 4;
            setTotal(novoTotal);

            // Determinando o rank
            defRank(novoTotal);

            // Determinando o nível
            defNivel(dados[0].xp);
        }
    }, [dados]);

    // Função para definir o rank baseado no total
    const defRank = (novoTotal: number) => {
        for (let i = 0; i < Rank.length; i++) {
            if (novoTotal >= Rank[i].count && novoTotal < Rank[i + 1]?.count) {
                setRank(Rank[i].rank);
                break;
            }
        }
    };

    // Função para definir o nível baseado no XP
    const defNivel = (xp: number) => {
        for (let i = 0; i < Nivel.length; i++) {
            if (xp >= Nivel[i].xp && xp < Nivel[i + 1]?.xp) {
                setNivel(Nivel[i].nivel);
                break;
            }
        }
    };

    // Exibir uma tela de carregamento enquanto os dados não são carregados
    if (!isClient || dados.length === 0) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={styles.page}>
            <div className={styles.up}></div>
            <div className={styles.perfilArea}>
                <div>
                    <h2>{dados[0].nome}</h2>
                    <h2>Nível: {nivel}</h2>
                    {Nivel.map((item, index) => (
                        <>
                            {item.nivel == nivel + 1 ?
                                <h5>{item.xp - dados[0].xp}xp para o proximo nivel</h5>
                                :
                                ''
                            }
                        </>
                    ))}
                    <h3>XP: {dados[0].xp}</h3>
                    <h3>Pontos: {dados[0].pontos}</h3>
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
                    <h3>Poder: {(dados[0].pow).toFixed(0)}</h3>
                    <h3>Hax: {(dados[0].hax).toFixed(0)}</h3>
                    <h2>Total: {total.toFixed(0)}</h2>
                    <h1>Rank: {rank}</h1>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
