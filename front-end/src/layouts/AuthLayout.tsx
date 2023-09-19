import { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

export default AuthLayout;
