"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface SujeitoContextType {
  registrarAcao: (acao: "evitou_espelho" | "fixou_no_outro" | "afastou_se" | "tentou_falar") => void;
  estadoAngustia: string;
  nivelAngustia: number; // 🔴 Adicionamos um valor numérico
}

const SujeitoContext = createContext<SujeitoContextType | null>(null);

interface SujeitoProviderProps {
  children: ReactNode;
}

export const SujeitoProvider = ({ children }: SujeitoProviderProps) => {
  const [historicoAcoes, setHistoricoAcoes] = useState<string[]>([]);
  const [estadoAngustia, setEstadoAngustia] = useState<string>("neutro");
  const [nivelAngustia, setNivelAngustia] = useState<number>(20); // 🔴 Iniciamos com um valor numérico

  const registrarAcao = (acao: "evitou_espelho" | "fixou_no_outro" | "afastou_se" | "tentou_falar") => {
    setHistoricoAcoes((prev) => [...prev, acao]);

    const ultimasAcoes = [...historicoAcoes, acao].slice(-5); // Pegamos as últimas 5 ações

    if (ultimasAcoes.filter(a => a === "evitou_espelho").length >= 3) {
      setEstadoAngustia("desconforto");
      setNivelAngustia(50); // 🔴 Ajustamos para um nível médio de angústia
    } else if (ultimasAcoes.filter(a => a === "fixou_no_outro").length >= 3) {
      setEstadoAngustia("fixação");
      setNivelAngustia(70); // 🔴 Angústia aumenta
    } else if (ultimasAcoes.filter(a => a === "afastou_se").length >= 3) {
      setEstadoAngustia("isolamento");
      setNivelAngustia(90); // 🔴 Angústia no nível alto
    } else {
      setEstadoAngustia("neutro");
      setNivelAngustia(20); // 🔴 Estado normal, angústia baixa
    }
  };

  return (
    <SujeitoContext.Provider value={{ registrarAcao, estadoAngustia, nivelAngustia }}>
      {children}
    </SujeitoContext.Provider>
  );
};

export const useSujeito = () => {
  const context = useContext(SujeitoContext);
  if (!context) {
    throw new Error("useSujeito deve ser usado dentro de um SujeitoProvider");
  }
  return context;
};
