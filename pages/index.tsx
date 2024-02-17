import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import VideoCard from "../components/VideoCard";
import { IVideo } from "../types";
import { fetchVideos } from "../utlis/fetchVideos";
import Head from "next/head";
import { useEffect, useState } from "react";

export async function getServerSideProps() {
  const videos = await fetchVideos();

  return { props: { videos } };
}

export default function Page({ videos }: { videos: IVideo[] }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <Box backgroundColor={useColorModeValue("gray.100", "black.100")}>
      <Head>
        <link rel="icon" href="/svgs/logo.svg" />
        <title>NoteVid</title>
      </Head>

      <Navbar />

      <SimpleGrid
        m={"10"}
        justifyContent={"center"}
        alignItems={"center"}
        minChildWidth="17rem"
        spacing="8"
      >
        {videos.map((video: IVideo) => {
          return (
            video.videoId && (
              <VideoCard
                key={video.videoId}
                imageUrl={video.thumbnail}
                imageAlt={video.title}
                title={video.title}
                channel={video.channelTitle}
                id={video.videoId}
              />
            )
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
