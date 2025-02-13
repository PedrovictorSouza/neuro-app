import createAngustiaService from "../services/AngustiaService";
import useAngustiaStorage from "./useAngustiaStorage";
import useAngustiaGraph from "./useAngustiaGraph";

export const useAngustiaService = () => { // ✅ Sem dependência desnecessária
  const storage = useAngustiaStorage();
  const graph = useAngustiaGraph();

  return createAngustiaService(storage, graph); // ✅ TypeScript infere o tipo
};
