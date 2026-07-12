import Sidebar from "./Sidebar";
import LayoutHeader from "./LayoutHeader";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex flex-1 flex-col min-h-0">
          <LayoutHeader />

          <main className="hide-scrollbar flex-1 min-h-0 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
