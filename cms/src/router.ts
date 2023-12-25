import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home";
import Login from "./pages/login";
import { IPage } from "./types";

const publicPages: IPage[] = [
  {
    path: "/login",
    component: Login,
    layout: AuthLayout,
  },
];

const privatePages: IPage[] = [
  {
    path: "/",
    component: Home,
    layout: MainLayout,
  },
];

export { publicPages, privatePages };
