import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { Navbar } from "../components/navbar";
import VideoCard from "../components/videoCard";
import { IVideoArr } from "../types";

export async function getServerSideProps() {
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API;
  const searchQuery = encodeURIComponent("coding, podcast, upsc");
  const maxResults = 100;
  const regionCode = "in";

  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${searchQuery}&key=${apiKey}&regionCode=${regionCode}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const videos = data.items
      .filter((video: any) => video.id.videoId)
      .map((video: any) => ({
        videoId: video.id.videoId,
        channelId: video.snippet.channelId,
        channelTitle: video.snippet.channelTitle,
        description: video.snippet.description,
        publishTime: video.snippet.publishTime,
        thumbnail: video.snippet.thumbnails.medium.url,
        title: video.snippet.title,
      }));

    return { props: { videos } };
  } catch (error) {
    console.error("Fetch error:", error);
    return { props: { videoData: [] } };
  }
}

export default function Page({ videos }: { videos: IVideoArr[] }) {

  return (
    <Box backgroundColor={useColorModeValue("gray.100", "black.100")}>
      <Head>
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
        {videos.map((video) => {
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
