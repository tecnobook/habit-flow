import { useEffect, useState } from "react";
import styles from './style.module.css';
import Nivel from "@/utils/nivel";

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
    const [nivel, setNivel] = useState(0);

    // Carregar dados do localStorage apenas após o lado do cliente ser montado
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsClient(true);
            const storedData = localStorage.getItem("dados");
            if (storedData) {
                setDados(JSON.parse(storedData));
            } else {
                setDados([
                    { nome: "Daniel", xp: 0, pontos: 0, for: 0, def: 0, vel: 0, int: 0, log: 0, pow: 0, hax: 0 },
                ]);
            }
        }
    }, []);

    // Função para definir o nível com base no XP
    const defNivel = () => {
        if (dados.length === 0) return; // Garantir que dados[0] exista antes de usar

        for (let i = 0; i < Nivel.length; i++) {
            if (dados[0].xp >= Nivel[i].xp && dados[0].xp < Nivel[i + 1]?.xp) {
                setNivel(Nivel[i].nivel);
                break; // Nível encontrado, interrompe o loop
            }
        }
    };

    // Usar o efeito para atualizar o nível após os dados serem carregados
    useEffect(() => {
        if (dados.length > 0) {
            defNivel();
        }
    }, [dados]); // Dependência em dados para garantir que defNivel seja chamado quando os dados estiverem prontos

    // Exibir uma tela de carregamento enquanto os dados não são carregados
    if (!isClient || dados.length === 0) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={styles.nav}>
            <a href="/"><h3>{dados[0].nome}</h3></a>
            <p>Nível: {nivel}</p>
            <p>Xp: {dados[0].xp}</p>
            <p>Pontos: {dados[0].pontos}</p>
            <div className={styles.local}>
                <a href="/perfil"><button className={styles.perfil}>Perfil</button></a>
                <a href="/loja"><button className={styles.perfil}>Loja</button></a>
            </div>
        </div>
    );
};

export default Perfil;
