import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import missionDay from '@/utils/missionDay';
import ContadorDeDias from '@/components/contadorDeDias/contadorDeDias';
import Missao from '@/components/Missao';
import ContadorDeDiasTest from '@/components/contadorDeDiastest';


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

interface Array {
  tarefa: string;
  img: string;
  qtd: number;
  plus: number;
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
  gloria: string;
  ok: string;
}

interface Data {
  dia: number;
  tarefas: number;
}

export default function Home() {

  "use client";
  const [isClient, setIsClient] = useState<boolean>(false);
  const [dados, setDados] = useState<Jogador[]>([]);
  const [dia, setDia] = useState<number>(1);
  const [items, setItems] = useState<Array[]>()
  const [yn, setYn] = useState<string>('y');
  const [menusDay, setMenusDay] = useState(92)
  const [numTar, setNumTar] = useState(0)
  const [data, setData] = useState<Data>({ dia: 0, tarefas: 0 });

  //Local de salvar as missões diarias no localStorage
  useEffect(() => {
    // Recupera os dados do localStorage ou usa os valores padrões caso não haja dados salvos
    const storedData: Data = JSON.parse(localStorage.getItem("data") || '{"dia":0,"tarefas":0}');

    // Atualiza o estado com os dados recuperados
    setData(storedData);
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("missionDay");
    if (storedData) {
      setItems(JSON.parse(storedData));
    } else {
      localStorage.setItem("missionDay", JSON.stringify(missionDay));
      setItems(missionDay);
    }
  }, []);

  useEffect(() => {
    // Função que verifica a data atual e calcula o dia
    const calcularDia = () => {
      const dataAtual = new Date();
      const inicioDoAno = new Date(dataAtual.getFullYear(), 0, 1); // 1º de janeiro
      const diferencaEmMillis = dataAtual.getTime() - inicioDoAno.getTime(); // Diferença em milissegundos
      const diasPassados = Math.floor(diferencaEmMillis / (1000 * 3600 * 24)); // Convertendo para dias
      setDia(diasPassados + 1); // Dia começa em 1
    };

    calcularDia(); // Chama a função para calcular o dia

    // Definindo um intervalo para atualizar a cada 24h
    const intervalo = setInterval(calcularDia, 24 * 60 * 60 * 1000);

    // Limpeza do intervalo quando o componente for desmontado
    return () => clearInterval(intervalo);
  }, []);

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

  //Acionar meia noite
  const acionarMeiaNoite = () => {
    if (data.tarefas >= missionDay.length) {
      setDia(dia - 1)

      const storedData = JSON.parse(localStorage.getItem("data") || '{"dia":0,"tarefas":0}');

      // Atualiza o valor de "dia" no objeto de dados
      storedData.dia = dia;

      // Salva os dados atualizados no localStorage
      localStorage.setItem("data", JSON.stringify(storedData));
    } else {
      localStorage.removeItem('data')
    }
  };

  useEffect(() => {
    // Função para calcular o tempo restante até a meia-noite
    const calcularTempoParaMeiaNoite = (): number => {
      const agora = new Date();
      const meiaNoite = new Date(agora);
      meiaNoite.setHours(24, 0, 0, 0); // Define meia-noite de hoje

      // Calcula a diferença entre agora e meia-noite (em milissegundos)
      const tempoRestante = meiaNoite.getTime() - agora.getTime();

      return tempoRestante;
    };

    // Função para configurar o "setInterval" e executar a função à meia-noite
    const iniciarTimer = () => {
      const tempoRestante = calcularTempoParaMeiaNoite();

      // Configura um timer para disparar a função à meia-noite
      setTimeout(() => {
        // Chama a função à meia-noite
        acionarMeiaNoite();

        // Configura o "setInterval" para que a função seja chamada todo dia à meia-noite
        setInterval(acionarMeiaNoite, 24 * 60 * 60 * 1000); // 24 horas em milissegundos
      }, tempoRestante);
    };

    // Inicia o timer para rodar a função à meia-noite
    iniciarTimer();
  }, []);

  // Função para atualizar o estado e salvar no localStorage
  const atualizarDados = (index: number, item: number, xp: number, pontos: number, forca: number, def: number, vel: number, int: number, log: number, pow: number, hax: number, con: number) => {
    if (isClient) {
      const novosDados = [...dados];
      novosDados[index].xp += xp;
      novosDados[index].pontos += pontos;
      novosDados[index].for += forca;
      novosDados[index].def += def;
      novosDados[index].vel += vel;
      novosDados[index].int += int;
      novosDados[index].log += log;
      novosDados[index].pow += pow;
      novosDados[index].hax += hax;
      novosDados[index].con += con;

      // Atualizando no estado e no localStorage
      setDados(novosDados);
      localStorage.setItem("dados", JSON.stringify(novosDados));
      window.location.reload();
    }

    const newItems = [...items];
    newItems[item].ok = 'y';

    setItems(newItems);
    localStorage.setItem("missionDay", JSON.stringify(newItems));

    setNumTar(numTar + 1)
  };

  // Exibir uma tela de carregamento enquanto os dados não são carregados no cliente
  if (!isClient) {
    return <div>Carregando...</div>;
  }

  const initTar = () => {
    localStorage.removeItem('missionDay')
    window.location.reload();
  }

  const incrementarTarefa = () => {
    const newTarefas = data.tarefas + 1;

    // Atualiza o estado com o novo valor de tarefas
    const newData = { ...data, tarefas: newTarefas };

    // Salva os novos dados no localStorage
    localStorage.setItem("data", JSON.stringify(newData));

    // Atualiza o estado com os novos dados
    setData(newData);
  };



  return (
    <div className={styles.page}>
      <div>{missionDay.length}</div>
      <div className={styles.space}></div>
      <button onClick={() => alert('Punição; Se não fizer todas as tarefas no dia, então começa de novo. Criar um array no local storage, que irá receber a variavel dia e um numero, tal numero começará com 0 e será acres. mais 1 toda vez que clicar em finalizado em uma tarefa. O acrescimo das tarefas referente ao dia será baseado no numero dia do array. Como são 8 tarefas, então quando o numero chegar a 8, não acontecerá nada, o numero dia do array será acrescentado mais 1 normalmente, mas se não chegar a 8, o numero dia continuará o mesmo. Essa função será ativada à 00:00 todos os dias. ')}>O qua falta fazer</button>
      <h1>Dia: <ContadorDeDiasTest /></h1>
      {numTar !== missionDay.length ?
        <div className={styles.init} onClick={() => { initTar(), localStorage.removeItem('data') }}>Iniciar Tarefas</div>
        :
        ''
      }
      <div className={styles.missions}>
        {items?.map((item, index) => (
          <>
            <Missao
              key={index}
              index={index}
              item={item}
              dia={dia}
              menusDay={menusDay}
              atualizarDados={atualizarDados}
              incrementarTarefa={incrementarTarefa}
            />
          </>
        ))}
      </div>
      <a href="/portugues"><button className={styles.button}>Portugues</button></a>
      <a href="/matematica"><button className={styles.button}>Matematica</button></a>
      <button onClick={() => alert('Criar o array das imagens de perfil; Colocar o nivel no navbar; colocar os gifs nas missões; criar os itens da loja; ')}>O que falta fazer?</button>
    </div>
  )
}