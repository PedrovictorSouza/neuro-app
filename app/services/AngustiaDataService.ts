// services/AngustiaDataService.ts
import useAngustiaStorage from "../hooks/useAngustiaStorage";

const createAngustiaDataService = (storage: ReturnType<typeof useAngustiaStorage>) => {
  return {
    registrar: (intensidade: number, contexto: string, sintomas: string[]) => {
      storage.salvarRegistro(intensidade, contexto, sintomas);
    },
    exportarRegistros: storage.exportarRegistros,
  };
};

export default createAngustiaDataService;
