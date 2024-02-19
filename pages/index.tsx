import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import VideoCard from "../components/VideoCard";
import { IVideo } from "../types";
import { fetchVideos } from "../utlis/fetchVideos";
import Head from "next/head";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../components/Navbar"), {
  ssr: false,
});

export async function getServerSideProps() {
  const videos = await fetchVideos();

  return { props: { videos } };
}

export default function Page({ videos }: { videos: IVideo[] }) {
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
