"use client";

import { useState } from "react";
import { SujeitoProvider } from "./context/SujeitoContext";
import AngustiaGraph from "./components/AngustiaGraph";
import Sintomas from "./components/Sintomas";

export default function Home() {
  // 🔹 Criamos o estado corretamente
  const [sintomas, setSintomas] = useState<string[]>([]);

  return (
    <SujeitoProvider>
      <div className="grid grid-cols-2 h-screen w-screen bg-gray-100 p-8 gap-6 items-start">
        
        {/* 📊 Gráfico de Angústia */}
        <div className="col-span-1 flex flex-col items-start">
          <AngustiaGraph sintomas={sintomas} />
        </div>

        {/* ✅ Sintomas agora recebe o estado corretamente */}
        <div className="col-span-1 flex flex-col items-start">
          <Sintomas 
            sintomasSelecionados={sintomas} 
            setSintomasSelecionados={setSintomas} 
          />
        </div>

      </div>
    </SujeitoProvider>
  );
}
