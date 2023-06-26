import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Upload from "../pages/Upload";

const routes = [
  {
    path: "/",
    component: Home,
    layout: MainLayout,
  },
  {
    path: "/login",
    component: Login,
    layout: AuthLayout,
  },
  {
    path: "/register",
    component: Register,
    layout: AuthLayout,
  },
  {
    path: "/upload",
    component: Upload,
    layout: MainLayout,
  },
];

export default routes;
