// services/IAngustiaService.ts
export interface IAngustiaService {
    registrar(intensidade: number, contexto: string, sintomas: string[], dificuldade: number): void;
    exportarRegistros(): void;
    pontos: { x: number; y: number; dificuldade: number }[];
    normalizarY(y: number): string;
  }
  