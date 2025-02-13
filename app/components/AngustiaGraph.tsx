"use client";
import React, { useState } from "react";
import { IAngustiaService } from "../services/IAngustiaService";
import { useAngustiaService } from "../hooks/useAngustiaService";

interface AngustiaGraphProps {
  sintomas: string[];
}

const AngustiaGraph: React.FC<AngustiaGraphProps> = ({ sintomas }) => {
  const { registrar, exportarRegistros, pontos, normalizarY } = useAngustiaService();
  const [intensidade, setIntensidade] = useState(0);
  const [dificuldade, setDificuldade] = useState(0);
  const [contexto, setContexto] = useState("");
  const [popup, setPopup] = useState<{ id: string; x: number; y: number } | null>(null);

  const handleRegistrarSensacao = () => {
    registrar(intensidade, contexto, sintomas, dificuldade); // ✅ Agora compatível com a função corrigida
    setContexto("");
  };



  const explicacoes: Record<string, string> = {
    inibicao: "A inibição ocorre quando há uma dificuldade em agir, mesmo com uma sensação presente. Pode estar ligada a bloqueios emocionais ou repressão.",
    sintoma: "O sintoma representa uma manifestação perceptível de um conflito interno, como ansiedade, tremores ou mal-estar, sem necessariamente uma dificuldade de agir.",
    zonaNeutra: "A zona neutra representa um estado de estabilidade, onde não há grande intensidade de sensação nem dificuldade de agir.",
    angustia: "A angústia é um estado de sofrimento psíquico intenso, geralmente acompanhado de dificuldade em agir, levando a uma sensação de paralisia emocional.",
    intensidade: "A intensidade da sensação representa o quão forte é a percepção da emoção ou sintoma no momento.",
    dificuldade: "Dificuldade em agir mede o quanto a sensação interfere na sua capacidade de realizar tarefas ou se movimentar.",
    contexto: "Aqui você pode descrever o que estava acontecendo ao seu redor quando sentiu a sensação. Isso pode incluir eventos, pensamentos ou situações.",
  
  };

  return (
    <div className="flex flex-col items-start min-h-screen relative">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Gráfico de Oscilação</h2>

      {/* Gráfico Visual */}
      <div className="relative w-80 h-80 bg-white border border-gray-700 overflow-visible">
        {/* Fundo com cores para representar as zonas */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          {[
            { id: "inibicao", label: "Inibição", color: "bg-blue-100", position: "top-2 left-2" },
            { id: "sintoma", label: "Sintoma", color: "bg-yellow-100", position: "top-2 right-2" },
            { id: "zonaNeutra", label: "Zona Neutra", color: "bg-green-100", position: "bottom-2 left-2" },
            { id: "angustia", label: "Angústia", color: "bg-red-100", position: "bottom-2 right-2" },
          ].map(({ id, label, color, position }) => (
            <div
              key={id}
              className={`${color} flex items-center justify-center text-gray-800 font-semibold relative`}
            >
              {label}
              <span
                className={`absolute ${position} cursor-pointer text-gray-700 w-6 h-6 flex items-center justify-center border border-gray-700 rounded-full text-sm bg-white`}
                onMouseEnter={(e) => setPopup({ id, x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setPopup(null)}
                onClick={(e) => setPopup(popup?.id === id ? null : { id, x: e.clientX, y: e.clientY })}
              >
                ❓
              </span>
            </div>
          ))}
        </div>

        {/* Eixos */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black"></div>

        {/* Renderiza os pontos no gráfico */}
        {pontos.map((ponto, index) => {
          let cor = "bg-red-500";
          if (ponto.y > 7 && ponto.dificuldade > 7) cor = "bg-yellow-500";
          else if (ponto.y < 4 && ponto.dificuldade > 7) cor = "bg-blue-500";
          else if (ponto.y < 4 && ponto.dificuldade < 4) cor = "bg-green-500";

          return (
            <div
              key={index}
              className={`w-4 h-4 ${cor} rounded-full absolute cursor-pointer`}
              style={{
                left: `${((ponto.x - 1) / 30) * 100}%`,
                bottom: normalizarY(ponto.y),
              }}
              title={`Intensidade: ${ponto.y} / Dificuldade: ${ponto.dificuldade}`}
            ></div>
          );
        })}
      </div>

      {/* Popups - Agora aparecem fora do gráfico */}
      {popup && (
        <div
          className="fixed bg-white border p-2 text-sm shadow-lg rounded-md w-48 z-50"
          style={{ top: popup.y + 10, left: popup.x + 10 }}
        >
          {explicacoes[popup.id]}
        </div>
      )}

      {/* Controles */}
      <div className="mt-4">
      <div className="mt-4 flex items-center">
  <h3 className="text-md font-semibold text-gray-700">Intensidade da Sensação</h3>
  <span
    className="ml-2 cursor-pointer text-gray-700 w-5 h-5 flex items-center justify-center border border-gray-700 rounded-full text-sm bg-white"
    onMouseEnter={(e) => setPopup({ id: "intensidade", x: e.clientX, y: e.clientY })}
    onMouseLeave={() => setPopup(null)}
  >
    ❓
  </span>
</div>
        <input
          type="range"
          min="1"
          max="10"
          value={intensidade}
          onChange={(e) => setIntensidade(Number(e.target.value))}
          className="w-full mt-2"
        />
        <span className="block text-sm text-gray-600">
          {intensidade <= 3 ? "Fraca" :
          intensidade <= 6 ? "Moderada" :
          intensidade <= 8 ? "Forte" :
          "Muito Forte"}
        </span>

      </div>

      <div className="mt-4">
      <div className="mt-4 flex items-center">
  <h3 className="text-md font-semibold text-gray-700">Dificuldade em Agir</h3>
  <span
    className="ml-2 cursor-pointer text-gray-700 w-5 h-5 flex items-center justify-center border border-gray-700 rounded-full text-sm bg-white"
    onMouseEnter={(e) => setPopup({ id: "dificuldade", x: e.clientX, y: e.clientY })}
    onMouseLeave={() => setPopup(null)}
  >
    ❓
  </span>
</div>

        <input
          type="range"
          min="1"
          max="10"
          value={dificuldade}
          onChange={(e) => setDificuldade(Number(e.target.value))}
          className="w-full mt-2"
        />
        <span className="block text-sm text-gray-600">
          {dificuldade <= 2 ? "Nenhuma" :
          dificuldade <= 4 ? "Leve" :
          dificuldade <= 6 ? "Moderada" :
          dificuldade <= 8 ? "Alta" :
          "Grande"}
        </span>

      </div>

      <div className="mt-4">
      <div className="mt-4 flex items-center">
  <h3 className="text-md font-semibold text-gray-700">O que estava acontecendo ao meu redor?</h3>
  <span
    className="ml-2 cursor-pointer text-gray-700 w-5 h-5 flex items-center justify-center border border-gray-700 rounded-full text-sm bg-white"
    onMouseEnter={(e) => setPopup({ id: "contexto", x: e.clientX, y: e.clientY })}
    onMouseLeave={() => setPopup(null)}
  >
    ❓
  </span>
</div>

        <textarea
          className="w-full p-2 border rounded mt-2"
          rows={3}
          placeholder="Descreva o momento..."
          value={contexto}
          onChange={(e) => setContexto(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-4 flex gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleRegistrarSensacao}>
          Registrar Sensação
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={exportarRegistros}>
          Exportar JSON
        </button>
      </div>
    </div>
  );
};

export default AngustiaGraph;
