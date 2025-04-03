import { useEffect, useState } from "react";

interface Jogador {
  nome: string;
  xp: number;
  pontos: number;
}

export default function Home() {
  // Estado para saber se estamos no cliente (browser)
  const [isClient, setIsClient] = useState<boolean>(false);

  // Definindo o estado com base no localStorage apenas após o lado do cliente ser montado
  const [dados, setDados] = useState<Jogador[]>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("dados");
      return storedData ? JSON.parse(storedData) : [
        { nome: "Jogador1", xp: 100, pontos: 50 },
      ];
    }
    return []; // Caso o código seja executado no servidor, retornamos um array vazio
  });

  useEffect(() => {
    // Apenas no lado do cliente (browser), o localStorage estará disponível
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  // Função para atualizar o estado e salvar no localStorage
  const atualizarDados = (index: number) => {
    if (isClient) {
      const novosDados = [...dados];
      novosDados[index].xp += 15;
      novosDados[index].pontos += 20;

      // Atualizando o estado e o localStorage
      setDados(novosDados);
      localStorage.setItem("dados", JSON.stringify(novosDados));
    }
  };

  useEffect(() => {
    // Apenas para garantir que os dados estão atualizados ao carregar
    if (isClient) {
      localStorage.setItem("dados", JSON.stringify(dados));
    }
  }, [dados, isClient]);

  if (!isClient) {
    return <div>Carregando...</div>; // Exibe uma mensagem até que o código seja executado no cliente
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Jogadores</h1>
      <ul>
        {dados.map((item, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <strong>{item.nome}</strong>
            <p>XP: {item.xp}</p>
            <p>Pontos: {item.pontos}</p>
            <button onClick={() => atualizarDados(index)}>
              Adicionar 15 XP e 20 Pontos
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
