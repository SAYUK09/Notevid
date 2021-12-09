import type { NextPage } from "next";
import { ColorModeScript, useColorMode, Button } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import theme from "../config/chakraConfig";

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Heading as="h1" size="xl" isTruncated>
        NoteVid: {process.env.NEXT_PUBLIC_FIREBASEAPI}
      </Heading>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </div>
  );
};

export default Home;
