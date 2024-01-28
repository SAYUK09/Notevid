import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/authContext";
import { VideoProvider } from "../context/videosContext";
import { theme } from "../utlis/chakraTheme";
import { store } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <VideoProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </VideoProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
