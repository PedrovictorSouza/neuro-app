// services/AngustiaService.ts
import { IAngustiaService } from "./IAngustiaService";
import useAngustiaStorage from "../hooks/useAngustiaStorage";
import useAngustiaGraph from "../hooks/useAngustiaGraph";

const createAngustiaService = (
    storage: ReturnType<typeof useAngustiaStorage>,
    graph: ReturnType<typeof useAngustiaGraph>
  ): IAngustiaService => {
    return {
      registrar: (intensidade, contexto, sintomas, dificuldade) => {
        storage.salvarRegistro(intensidade, contexto, sintomas);
        graph.adicionarPonto(intensidade, dificuldade);
      },
      exportarRegistros: storage.exportarRegistros,
      pontos: graph.pontos,
      normalizarY: graph.normalizarY,
    };
  };
  
  export default createAngustiaService;