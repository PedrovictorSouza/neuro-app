// hooks/useAngustiaService.ts
import createAngustiaService from "../services/AngustiaService";
import  useAngustiaStorage  from "./useAngustiaStorage";
import  useAngustiaGraph  from "./useAngustiaGraph";
import { IAngustiaService } from "../services/IAngustiaService";

export const useAngustiaService = (): IAngustiaService => {
  const storage = useAngustiaStorage();
  const graph = useAngustiaGraph();

  return createAngustiaService(storage, graph);
};
