"use client";

import { useState } from "react";
import { SujeitoProvider } from "./context/SujeitoContext";
import AngustiaGraph from "./components/AngustiaGraph";
import Sintomas from "./components/Sintomas";
import Layout from "./components/Layout";

export default function Home() {
  // 🔹 Criamos o estado corretamente
  const [sintomas, setSintomas] = useState<string[]>([]);

  return (
    <SujeitoProvider>
      <Layout>
        <div className="grid grid-cols-2 h-screen w-screen p-8 gap-6 items-start">

        <div className="col-span-1 flex flex-col items-start">
            <Sintomas 
              sintomasSelecionados={sintomas} 
              setSintomasSelecionados={setSintomas} 
            />
          </div>
          
          {/* 📊 Gráfico de Angústia */}
          <div className="col-span-1 flex flex-col items-start">
            <AngustiaGraph sintomas={sintomas} />
          </div>

          {/* ✅ Sintomas agora recebe o estado corretamente */}
          

        </div>
      </Layout>
    </SujeitoProvider>
  );
}
