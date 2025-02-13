"use client";
import React, { useEffect, useState } from "react";
import { useSujeito } from "../context/SujeitoContext";
import { SujeitoActions } from "../services/SujeitoActions";

const MedidorAngustia = () => {
  const { nivelAngustia, registrarAcao } = useSujeito();
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    if (Math.random() > 0.7) {
      setVisivel(false); // 🔴 Medidor desaparece por um tempo
      setTimeout(() => setVisivel(true), 3000);
    }
  }, [nivelAngustia]);

  return visivel ? (
    <div className="absolute top-5 left-5 p-4  rounded-lg shadow-md w-48">
      <h2 className="text-sm font-semibold text-gray-700">Nível de Angústia</h2>
      <div className="w-full rounded-full h-4 mt-2">
        <div
          className="bg-red-500 h-4 rounded-full transition-all duration-300"
          style={{ width: `${nivelAngustia}%` }}
          onClick={() => registrarAcao(SujeitoActions.afastarSe())}
        ></div>
      </div>
    </div>
  ) : null;
};

export default MedidorAngustia;
