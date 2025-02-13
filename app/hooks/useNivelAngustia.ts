// hooks/useNivelAngustia.ts
import { useSujeito } from "../context/SujeitoContext";
import { useMemo } from "react";

export const useNivelAngustia = () => {
  const { nivelAngustia } = useSujeito();

  return useMemo(() => ({ nivelAngustia }), [nivelAngustia]); // ✅ Memoriza para evitar re-renders
};
