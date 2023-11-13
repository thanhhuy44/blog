import { type ReactElement, type ReactNode } from "react";
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
import Head from "next/head";
import favicon from "@/assets/images/favicon.png";

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
      {getLayout(
        <GoogleOAuthProvider clientId="725001572314-dcstfjo3925ig02enku0e8tua7niq4lr.apps.googleusercontent.com">
          <Head>
            <title>Spostless | Enjoy your life!</title>
            <link
              rel="shortcut icon"
              href={`${favicon.src}`}
              type="image/x-icon"
            />
          </Head>
          <Component {...pageProps} />
          <ToastContainer />
        </GoogleOAuthProvider>
      )}
    </Provider>
  );
}
