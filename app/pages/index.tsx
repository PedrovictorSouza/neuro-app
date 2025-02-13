"use client";

import { SujeitoProvider } from "../context/SujeitoContext";
import Espelho from "../components/Espelho";
import MedidorAngustia from "../components/MedidorAngustia";
import AngustiaGraph from "../components/AngustiaGraph";

export default function Home() {
  return (
    <SujeitoProvider>
      <div className="h-screen w-screen flex bg-gray-100 p-8">
        
        {/* 📊 Área dos Gráficos (Esquerda) */}
        <div className="flex flex-col w-1/3 space-y-6">
          <MedidorAngustia />
          <AngustiaGraph />
        </div>

        {/* 📌 Área dos Componentes do Sujeito (Direita) */}
        <div className="flex flex-col w-2/3 space-y-6 items-center">

          <Espelho />
        </div>
        
      </div>
    </SujeitoProvider>
  );
}
