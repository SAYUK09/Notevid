import type { NextPage } from "next";
import { ColorModeScript } from "@chakra-ui/react";
import Head from "next/head";
import theme from "../config/chakraConfig";
import { Navbar } from "../components/login/navbar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>NoteVid</title>
      </Head>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <Navbar />
    </div>
  );
};

export default Home;
