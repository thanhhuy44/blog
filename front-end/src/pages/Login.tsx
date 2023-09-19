import AuthLayout from "@/layouts/AuthLayout";
import { ReactElement } from "react";

function Login() {
  return <h1>login page</h1>;
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
