"use client";
import { useState, useEffect } from "react";

const STORAGE_FILE = "/registros_angustia.json"; // Caminho do arquivo JSON na pasta public/

const useAngustiaStorage = () => {
  const [registros, setRegistros] = useState<
    { intensidade: number; timestamp: string; contexto: string; sintomas: string[] }[]
  >([]);

  // Carrega os registros do JSON
  const carregarRegistros = async () => {
    try {
      const response = await fetch(STORAGE_FILE, { cache: "no-store" });

      if (!response.ok) {
        console.warn("Arquivo JSON não encontrado, inicializando registros vazios.");
        setRegistros([]);
        return;
      }

      const text = await response.text();
      if (!text) {
        console.warn("Arquivo JSON está vazio, inicializando registros vazios.");
        setRegistros([]);
        return;
      }

      const data = JSON.parse(text);
      setRegistros(data);
    } catch (error) {
      console.error("Erro ao carregar registros:", error);
      setRegistros([]);
    }
  };

  useEffect(() => {
    carregarRegistros();
  }, []);

  // Salva os registros na memória sem baixar imediatamente
  const salvarRegistro = (intensidade: number, contexto: string, sintomas: string[]) => {
    const timestamp = new Date().toISOString();
    const novoRegistro = { intensidade, timestamp, contexto, sintomas };
    const novosRegistros = [...registros, novoRegistro];
    setRegistros(novosRegistros);
  };

  // Exporta os registros para JSON quando o usuário desejar
  const exportarRegistros = () => {
    const blob = new Blob([JSON.stringify(registros, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "registros_angustia.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { registros, salvarRegistro, exportarRegistros };
};

export default useAngustiaStorage;
