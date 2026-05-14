import Sidebar from "./Sidebar";
import LayoutHeader from "./LayoutHeader";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-0">
          <LayoutHeader />
          <main className="p-6 flex-1 max-h-[calc(100vh-10rem)]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
