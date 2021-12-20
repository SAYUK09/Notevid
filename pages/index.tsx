import type { NextPage } from "next";
import { ColorModeScript, Flex, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import theme from "../config/chakraConfig";
import { Navbar } from "../components/login/navbar";
import VideoCard from "../components/login/videoCard";
import { useVideos } from "../context/videosContext";

const Home: NextPage = () => {
  const { videos } = useVideos();

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
        {videos.map((video) => {
          return (
            <VideoCard
              imageUrl={video.thumbnail}
              imageAlt={video.title}
              title={video.title}
              channel={video.channelTitle}
            />
          );
        })}
      </SimpleGrid>
    </div>
  );
};

export default Home;
