import * as React from "react";

function AuthLayout({ children }: { children: string | React.ReactNode }) {
  return (
    <main className="h-screen w-screen overflow-hidden grid grid-cols-2 p-8">
      <div className="flex items-center justify-center">{children}</div>
      <div className="bg-gray-700 rounded-xl flex items-center justify-center shadow-lg">
        <h1 className="text-3xl font-bold text-white">CMS</h1>
      </div>
    </main>
  );
}

export default AuthLayout;
