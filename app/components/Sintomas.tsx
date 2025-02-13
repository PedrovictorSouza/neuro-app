"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // 🎯 Importamos Framer Motion

interface SintomasProps {
  sintomasSelecionados: string[];
  setSintomasSelecionados: React.Dispatch<React.SetStateAction<string[]>>;
}

const Sintomas: React.FC<SintomasProps> = ({ sintomasSelecionados = [], setSintomasSelecionados }) => {
  const [aberto, setAberto] = useState(false); // Estado do sanfonado

  const sintomasDisponiveis = [
    "Ansiedade",
    "Tontura",
    "Palpitações",
    "Náusea",
    "Falta de ar",
    "Sudorese",
    "Sensação de sufocamento",
    "Sensação de irrealidade",
    "Medo intenso",
    "Tremores",
    "Pressão no peito",
    "Dificuldade para engolir",
    "Calafrios ou ondas de calor"
  ];

  const toggleSintoma = (sintoma: string) => {
    setSintomasSelecionados((prev) =>
      prev.includes(sintoma)
        ? prev.filter((s) => s !== sintoma)
        : [...prev, sintoma]
    );
  };

  // 🔹 Função para renderizar texto letra por letra
  const AnimatedText = ({ text }: { text: string }) => (
    <motion.span>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.03 }} // 🔥 Intervalo de 0.03s por letra
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );

  return (
    <motion.div
  className="absolute left-5 top-24 p-4 bg-gray-800 rounded-2xl w-56 text-white border-2 border-gray-600 shadow-lg"
  initial={{ opacity: 0, y: -10, height: "auto", borderRadius: "16px" }} // 🔹 Aplica border-radius via animação também
  animate={{ opacity: 1, y: 0, height: aberto ? "auto" : "60px", borderRadius: "16px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  >

      {/* Cabeçalho do sanfonado */}
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setAberto(!aberto)}>
        <h2 className="text-md font-semibold text-white">
          <AnimatedText text="Sintomas" /> {/* 🔥 Texto "Sintomas" animado */}
        </h2>
        <motion.span
          className="text-white text-xs w-6 h-6 flex items-center justify-center rounded-full border border-gray-500"
          animate={{ rotate: aberto ? 180 : 0 }} // 🎯 Suaviza a rotação do ícone
          whileHover={{ color: "#93c5fd", borderColor: "#93c5fd" }} // 🔹 Efeito de hover azul claro
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          ▲
        </motion.span>
      </div>

      {/* Conteúdo do sanfonado com animação */}
      <AnimatePresence>
        {aberto && (
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Subtexto agora surge letra por letra */}
            <p className="text-xs text-gray-400 mb-3">
              <AnimatedText text="Selecione os sintomas que sentiu no momento." />
            </p>

            {/* Lista de sintomas com efeito individual em cada item */}
            <div className="flex flex-col gap-1">
              {sintomasDisponiveis.map((sintoma, index) => (
                <motion.label
                  key={sintoma}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }} // 🔹 Adiciona fade-out nos itens ao fechar
                  transition={{ duration: 0.2, delay: index * 0.03 }} // 🔹 Mantém a sequência
                >
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-400 accent-blue-500"
                    checked={sintomasSelecionados?.includes(sintoma) || false}
                    onChange={() => toggleSintoma(sintoma)}
                  />
                  <span className="text-xs text-gray-200">{sintoma}</span>
                </motion.label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Sintomas;
