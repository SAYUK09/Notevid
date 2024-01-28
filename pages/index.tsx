import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import VideoCard from "../components/videoCard";
import { IVideo } from "../types";
import { fetchVideos } from "../utlis/fetchVideos";

export async function getServerSideProps() {
  const videos = await fetchVideos();

  return { props: { videos } };
}

export default function Page({ videos }: { videos: IVideo[] }) {
  return (
    <Box backgroundColor={useColorModeValue("gray.100", "black.100")}>
      <title>NoteVid</title>

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
