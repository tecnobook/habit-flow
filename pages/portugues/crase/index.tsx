import crase from "@/utils/crase";
import styles from './style.module.css';
import { useEffect, useState } from "react";

interface Jogador {
    nome: string;
    xp: number;
    pontos: number;
    for: number;
    def: number;
    vel: number;
    con: number;
    int: number;
    log: number;
    pow: number;
    hax: number;
}

export default function Crase() {
    const [colorA, setColorA] = useState('white');
    const [colorB, setColorB] = useState('white');
    const [colorC, setColorC] = useState('white');
    const [colorD, setColorD] = useState('white');
    const [colorE, setColorE] = useState('white');
    const [correct, setCorrect] = useState('');
    const [quest, setQuest] = useState<number>(0);
    const [display, setDisplay] = useState('none');
    const [isClient, setIsClient] = useState<boolean>(false);
    const [dados, setDados] = useState<Jogador[]>([]);

    // Recuperando os dados e o valor de quest do localStorage após a montagem do componente
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsClient(true);

            // Carregar os dados dos jogadores
            const storedData = localStorage.getItem("dados");
            if (storedData) {
                setDados(JSON.parse(storedData));
            } else {
                // Valor padrão caso não haja dados no localStorage
                setDados([
                    { nome: "Daniel", xp: 0, pontos: 0, for: 0, def: 0, con: 0, vel: 0, int: 1, log: 0, pow: 0, hax: 1 },
                ]);
            }

            // Carregar o valor de quest
            const storedQuest = localStorage.getItem("quest");
            if (storedQuest) {
                setQuest(JSON.parse(storedQuest));
            }
        }
    }, []);

    // Função para atualizar o estado e salvar no localStorage
    const atualizarDados = (index: number, pontos: number, xp: number, int: number) => {
        if (isClient) {
            const novosDados = [...dados];
            novosDados[index].xp += xp;
            novosDados[index].pontos += pontos;
            novosDados[index].int += int;

            // Atualizando no estado e no localStorage
            setDados(novosDados);
            localStorage.setItem("dados", JSON.stringify(novosDados));
            window.location.reload();
        }
    };

    // Função para atualizar o estado quando o jogador errar
    const atualizarDadosErrou = (index: number) => {
        if (isClient) {
            const novosDados = [...dados];
            novosDados[index].xp -= 5;
            novosDados[index].pontos -= 10;

            // Atualizando no estado e no localStorage
            setDados(novosDados);
            localStorage.setItem("dados", JSON.stringify(novosDados));
        }
    };

    // Função para atualizar a quest e salvar no localStorage
    const resposta = (letter: string, pontos: number, xp: number, int: number) => {
        if (letter == crase[0].correct) {
            setCorrect('acertou');
            atualizarDados(0, pontos, xp, int);

            // Atualizando quest
            const novoValor = quest + 1;
            setQuest(novoValor);
            localStorage.setItem('quest', JSON.stringify(novoValor));

            alert(novoValor); // Alerta mostrando a quest atualizada
        } else {
            setCorrect('errou');
            atualizarDadosErrou(0);

            // Atualizando quest
            if (quest <= crase.length - 1) {
                const novoValor = quest + 1;
                setQuest(novoValor);
                localStorage.setItem('quest', JSON.stringify(novoValor));

            }
        }
    }

    // Exibir uma tela de carregamento enquanto os dados não são carregados no cliente
    if (!isClient) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={styles.page}>
            <div className={styles.space}></div>
            <div>correct {correct}</div>
            <div className={styles.question}>{crase[quest].question}</div>
            <div className={styles.alternative}>
                <div className={styles.ButtonPlace} onClick={() => {
                    correct == 'A' ? setCorrect('') : setCorrect('A'),
                        setDisplay('flex'),
                        colorA == 'white' ? (
                            setColorA('aqua'),
                            setColorB('white'),
                            setColorC('white'),
                            setColorD('white'),
                            setColorE('white')
                        ) : setColorA('white')
                }} style={{ backgroundColor: colorA }}>A</div>
                <div>{crase[quest].a}</div>
            </div>
            <div className={styles.alternative}>
                <div className={styles.ButtonPlace} onClick={() => {
                    correct == 'B' ? setCorrect('') : setCorrect('B'),
                        setDisplay('flex'),
                        colorB == 'white' ? (
                            setColorA('white'),
                            setColorB('aqua'),
                            setColorC('white'),
                            setColorD('white'),
                            setColorE('white')
                        ) : setColorB('white')
                }} style={{ backgroundColor: colorB }}>B</div>
                <div>{crase[quest].b}</div>
            </div>
            <div className={styles.alternative}>
                <div className={styles.ButtonPlace} onClick={() => {
                    correct == 'C' ? setCorrect('') : setCorrect('C'),
                        setDisplay('flex'),
                        colorC == 'white' ? (
                            setColorD('white'),
                            setColorA('white'),
                            setColorB('white'),
                            setColorC('aqua'),
                            setColorE('white')
                        ) : setColorC('white')
                }} style={{ backgroundColor: colorC }}>C</div>
                <div>{crase[quest].c}</div>
            </div>
            <div className={styles.alternative}>
                <div className={styles.ButtonPlace} onClick={() => {
                    correct == 'D' ? setCorrect('') : setCorrect('D'),
                        setDisplay('flex'),
                        colorD == 'white' ? (
                            setColorD('aqua'),
                            setColorA('white'),
                            setColorB('white'),
                            setColorC('white'),
                            setColorE('white')
                        ) : setColorD('white')
                }} style={{ backgroundColor: colorD }}>D</div>
                <div>{crase[quest].d}</div>
            </div>
            <div className={styles.alternative}>
                <div className={styles.ButtonPlace} onClick={() => {
                    correct == 'E' ? setCorrect('') : setCorrect('E'),
                        setDisplay('flex'),
                        colorE == 'white' ? (
                            setColorE('aqua'),
                            setColorA('white'),
                            setColorB('white'),
                            setColorC('white'),
                            setColorD('white')
                        ) : setColorE('white')
                }} style={{ backgroundColor: colorE }}>E</div>
                <div>{crase[quest].e}</div>
            </div>
            <div>Acumulo - xp: 0 - pontos: 0</div>
            <div className={styles.askArea}>
                <button style={{ display: display }} onClick={() => resposta(correct, crase[quest].pontos, crase[quest].xp, crase[quest].int)}>
                    Responder
                </button>
                <div>{quest}</div>
            </div>
        </div>
    )
}
