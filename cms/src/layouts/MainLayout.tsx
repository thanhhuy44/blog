import * as React from "react";

function MainLayout({ children }: { children: React.ReactNode | string }) {
  return (
    <main>
      <h1>main layout</h1>
      {children}
    </main>
  );
}

export default MainLayout;
