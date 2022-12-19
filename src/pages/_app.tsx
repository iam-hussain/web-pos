import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { useApollo } from "src/graphql/client";
import theme from "../styles/theme";
import createEmotionCache from "../styles/createEmotionCache";
import { store } from "src/providers/store";
import "../styles/global.css";
import Alert from "@components/atoms/alert";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const apolloClient = useApollo(pageProps);
  1;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Alert />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    </CacheProvider>
  );
}
