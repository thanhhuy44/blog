import * as React from "react";
import SideBar from "../components/SideBar";

function MainLayout({ children }: { children: React.ReactNode | string }) {
  return (
    <main className="flex items-stretch h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="flex-1 h-screen overflow-y-auto">{children}</div>
    </main>
  );
}

export default MainLayout;
