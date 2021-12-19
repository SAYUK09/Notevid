import type { NextPage } from "next";
import { ColorModeScript, Flex, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import theme from "../config/chakraConfig";
import { Navbar } from "../components/login/navbar";
import VideoCard from "../components/login/videoCard";

const Home: NextPage = () => {
  const arr = [1, 2, 3, 4, 5, 7, 8, 9];
  return (
    <div>
      <Head>
        <title>NoteVid</title>
      </Head>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <Navbar />

      <SimpleGrid
        m={"10"}
        justifyContent={"center"}
        alignItems={"center"}
        minChildWidth="17rem"
        spacing="8"
      >
        {arr.map(() => {
          return (
            <VideoCard
              imageUrl={"https://bit.ly/2Z4KKcF"}
              imageAlt={"video"}
              title={"video title"}
              date={"2 days ago"}
              views={"12m"}
            />
          );
        })}
      </SimpleGrid>
    </div>
  );
};

export default Home;
