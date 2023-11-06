import { useEffect, type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider, useSelector } from "react-redux";
import store, { AppState } from "@/redux";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "swiper/css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <div>
        {getLayout(
          <GoogleOAuthProvider clientId="725001572314-dcstfjo3925ig02enku0e8tua7niq4lr.apps.googleusercontent.com">
            <Component {...pageProps} />
            <ToastContainer />
          </GoogleOAuthProvider>
        )}
      </div>
    </Provider>
  );
}
