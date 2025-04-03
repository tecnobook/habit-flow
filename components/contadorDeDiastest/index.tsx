import { useEffect, useState } from 'react';

interface ContadorDeDiasTestProps {
    myValue: number;
}

// Componente que retorna apenas o valor do dia ajustado
const ContadorDeDiasTest: React.FC<ContadorDeDiasTestProps> = ({ myValue }) => {
    const [dia, setDia] = useState<number>(1);

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
    }, []); // O array vazio significa que o useEffect será chamado apenas uma vez quando o componente for montado

    // Retorna apenas o valor do dia ajustado
    return dia - myValue;
};

export default ContadorDeDiasTest;
