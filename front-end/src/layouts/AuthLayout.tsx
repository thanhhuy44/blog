import Image from "next/image";
import { ReactNode } from "react";
import Banner from "@/assets/images/banner-auth.gif";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 h-screen overflow-hidden">
      <div className="flex items-center justify-center overflow-y-auto px-4">
        {children}
      </div>
      <div className="h-screen overflow-hidden">
        <Image
          className="h-full w-full object-cover object-center"
          src={Banner}
          alt="banner"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
