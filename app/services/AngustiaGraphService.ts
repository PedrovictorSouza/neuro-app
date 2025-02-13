// services/AngustiaGraphService.ts
import useAngustiaGraph from "../hooks/useAngustiaGraph";

const createAngustiaGraphService = (graph: ReturnType<typeof useAngustiaGraph>) => {
  return {
    pontos: graph.pontos,
    normalizarY: graph.normalizarY,
  };
};

export default createAngustiaGraphService;
