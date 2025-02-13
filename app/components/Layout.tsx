const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative h-screen w-screen flex flex-col bg-app-gradient p-5">
      {/* Cabeçalho do Dashboard */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard da Angústia</h1>
      </div>

      {/* Conteúdo Central */}
      <div className="flex flex-grow items-center justify-center gap-8 mt-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
