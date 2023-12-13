import React, { Fragment } from "react";
import Router from "next/router";
import { wrapper } from "../store";

// types
import type { AppProps } from "next/app";

// global styles
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "../assets/css/styles.scss";
import ThemeProvider from "../components/context/theme-provider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  );
};

export default wrapper.withRedux(MyApp);
