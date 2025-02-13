import { useState } from "react";

// Hook personalizado para gerenciar a lógica do gráfico
const useAngustiaGraph = () => {
  const [pontos, setPontos] = useState<{ x: number; y: number; dificuldade: number }[]>([]);
  const [xAtual, setXAtual] = useState(1); // Controla o eixo X (dias do mês)

  // Normaliza os valores de Y para mantê-los dentro do gráfico
  const normalizarY = (y: number) => {
    return `${(y / 10) * 100}%`;
  };

  // Adiciona um novo ponto no gráfico com a dificuldade percebida
  const adicionarPonto = (y: number, dificuldade: number) => {
    if (xAtual > 31) return;

    setPontos((prevPontos) => [...prevPontos, { x: xAtual, y, dificuldade }]); 
    setXAtual(xAtual + 1);
  };

  return { pontos, adicionarPonto, normalizarY };
};

export default useAngustiaGraph;
