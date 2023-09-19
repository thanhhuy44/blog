import Header from "@/components/Header";
import { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen">
      <Header />
      <div className="container mx-auto ">{children}</div>
    </div>
  );
}

export default MainLayout;
