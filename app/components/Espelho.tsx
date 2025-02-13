"use client";
import React, { useState, useEffect } from "react";
import { useSujeito } from "../context/SujeitoContext";

const Espelho = () => {
  const { registrarAcao, estadoAngustia } = useSujeito();
  const [reflexo, setReflexo] = useState("🔲");

  useEffect(() => {
    if (Math.random() > 0.8) {
      setReflexo("");
    } else {
      setReflexo(
        estadoAngustia === "desconforto" ? "🌀" :
        estadoAngustia === "fixação" ? "❓" :
        estadoAngustia === "isolamento" ? "🚫" :
        "🔲"
      );
    }
  }, [estadoAngustia]);

  return (
    <div
      className="p-8 bg-gray-300 rounded-lg shadow-md text-center"
      onMouseEnter={() => registrarAcao("evitou_espelho")}
      onClick={() => registrarAcao("fixou_no_outro")}
    >
      <h2 className="text-lg font-semibold">🪞 Espelho Enigmático</h2>
      <p className="text-4xl mt-2">{reflexo || " "}</p>
      <p className="text-sm text-gray-700 mt-1">
        {reflexo ? "O que você vê não é exatamente o que é." : "O Espelho se recusa a refletir..."}
      </p>
    </div>
  );
};

export default Espelho;
