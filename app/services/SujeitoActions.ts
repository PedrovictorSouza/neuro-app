// services/SujeitoActions.ts
export const SujeitoActions: Record<"evitarEspelho" | "fixarNoOutro" | "afastarSe" | "tentarFalar", () => "afastou_se" | "evitou_espelho" | "fixou_no_outro" | "tentou_falar"> = {
    evitarEspelho: () => "evitou_espelho",
    fixarNoOutro: () => "fixou_no_outro",
    afastarSe: () => "afastou_se",
    tentarFalar: () => "tentou_falar",
  };
  