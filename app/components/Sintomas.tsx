"use client";
import React from "react";

interface SintomasProps {
  sintomasSelecionados: string[];
  setSintomasSelecionados: React.Dispatch<React.SetStateAction<string[]>>;
}

const Sintomas: React.FC<SintomasProps> = ({ sintomasSelecionados = [], setSintomasSelecionados }) => {
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

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md w-80">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Sintomas</h2>
      <p className="text-sm text-gray-600 mb-4">Selecione os sintomas que sentiu no momento.</p>

      <div className="grid grid-cols-2 gap-2">
        {sintomasDisponiveis.map((sintoma) => (
          <label key={sintoma} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox text-blue-500"
              checked={sintomasSelecionados?.includes(sintoma) || false}
              onChange={() => toggleSintoma(sintoma)}
            />
            <span className="text-sm text-gray-700">{sintoma}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Sintomas;
