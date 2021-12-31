import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/authContext";
import { VideoProvider } from "../context/videosContext";
import { theme } from "../utlis/chakraTheme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <VideoProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </VideoProvider>
    </AuthProvider>
  );
}

export default MyApp;
