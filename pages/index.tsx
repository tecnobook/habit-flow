import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import missionDay from '@/utils/missionDay';
import StudyArea from '@/components/studyArea';
import Missao from '@/components/Missao';
import ContadorDeDiasTest from '@/components/contadorDeDiastest';
import Botao from '@/components/button';

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

interface Missao {
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
  const [items, setItems] = useState<Missao[]>([]); // Mudança para Missao[]
  const [menusDay, setMenusDay] = useState(92);
  const [numTar, setNumTar] = useState(0);
  const [data, setData] = useState<Data>({ dia: dia, tarefas: 0 });

  const [diaAtual, setDiaAtual] = useState<number>(0);
  const [diaPos, setDiaPos] = useState(2);
  const defaultValue = 92;  // Valor padrão que você quer que seja usado
  const [myValue, setMyValue] = useState<number>(defaultValue); // Inicializa com o valor padrão



  useEffect(() => {
    // Só acessar o localStorage no lado do cliente
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('myValue'); // Lê o valor do localStorage
      if (storedValue) {
        setMyValue(JSON.parse(storedValue)); // Define o valor no estado se existir
      } else {
        localStorage.setItem('myValue', JSON.stringify(defaultValue)); // Se não existir, salva o valor padrão
      }
    }
  }, []); // Isso só será executado uma vez, após o componente ser montado no cliente

  // Função que pega o número do dia atual
  const obterNumeroDoDia = (): number => {
    const hoje = new Date();
    return hoje.getDate(); // getDate() retorna o número do dia do mês (1 a 31)
  };

  useEffect(() => {
    // Quando o componente for montado, obtém o número do dia
    const numeroDoDia = obterNumeroDoDia();
    setDiaAtual(numeroDoDia);
  }, []);

  //Local de salvar as missões diarias no localStorage
  useEffect(() => {
    // Recupera os dados do localStorage ou usa os valores padrões caso não haja dados salvos
    const storedData: Data = JSON.parse(localStorage.getItem("data") || `{"dia":${dia},"tarefas":0}`);

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

  const saveToLocalStorage = (value: number) => {
    // Salva no localStorage e também atualiza o estado
    setMyValue(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('myValue', JSON.stringify(value)); // Salva o valor no localStorage
    }
  };

  //Acionar meia noite
  const acionarMeiaNoite = () => {
    if (data.tarefas >= missionDay.length) {
      setDiaPos(diaAtual)
      alert('Parabens! Você completou!')
      initTar()
      saveToLocalStorage(myValue - 1)
    } else {
      alert('Você não completou! Tente novamente hoje')
      initTar()
      saveToLocalStorage(myValue + 1)
    }
    if (diaAtual == diaPos) {

      const storedData = JSON.parse(localStorage.getItem("data") || `{"dia":${dia - menusDay},"tarefas":0}`);

      // Atualiza o valor de "dia" no objeto de dados
      storedData.dia = dia - menusDay;
      storedData.tarefas = 0;

      // Salva os dados atualizados no localStorage
      localStorage.setItem("data", JSON.stringify(storedData));
      setData(storedData)
    } else {
      const storedData = JSON.parse(localStorage.getItem("data") || `{"dia":${dia - menusDay},"tarefas":0}`);

      storedData.tarefas = 0;

      localStorage.setItem("data", JSON.stringify(storedData));
      if (storedData.tarefas == 0) {
        localStorage.removeItem('data')
        setData(storedData)
      }
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
      <h1>Andar: <ContadorDeDiasTest myValue={myValue} /></h1>
      <div className={styles.missions}>
        {(items ?? []).map((item, index) => (
          <Missao
            key={index}
            index={index}
            item={item}
            dia={dia}
            menusDay={myValue}
            atualizarDados={atualizarDados}
            incrementarTarefa={incrementarTarefa}
          />
        ))}
        {data.tarefas >= missionDay.length ?
          <div onClick={() => acionarMeiaNoite()}>
            <Botao name={'Finalizado'} />
          </div>
          :
          ''
        }
      </div>
      <StudyArea />
    </div>
  );
}
