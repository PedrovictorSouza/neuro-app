"use client";
import React from "react";
import MedidorAngustia from "./MedidorAngustia";
import AngustiaGraph from "./AngustiaGraph";
import Sintomas from "./Sintomas";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative h-screen w-screen flex flex-col bg-gray-50 p-5">
      {/* Cabeçalho do Dashboard */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
        <MedidorAngustia />
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard da Angústia</h1>
        <AngustiaGraph />
        <Sintomas/>
      </div>

      {/* Conteúdo Central - Organizado em 3 Colunas */}
      <div className="flex flex-grow items-center justify-center gap-8 mt-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
