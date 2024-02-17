import dynamic from "next/dynamic";
import { Box, useColorModeValue } from "@chakra-ui/react";
import React, { useRef } from "react";
import Navbar from "../../components/Navbar";
import NotesContainer from "../../components/NotesContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchVideos } from "../../utlis/fetchVideos";
import { IVideo } from "../../types";

const VideoPlayer = dynamic(() => import("../../components/VideoPlay"), {
  ssr: false,
});

type Params = {
  params: {
    id: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const id = params.id;
  return { props: { id } };
}

export async function getStaticPaths() {
  const videos = await fetchVideos();

  const paths = videos.map((video: IVideo) => ({
    params: {
      id: video.videoId,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default function Video({ id }: { id: string }) {
  const videoRef = useRef<HTMLElement>(null);

  return (
    <Box
      height={"100vh"}
      backgroundColor={useColorModeValue("gray.100", "black.100")}
    >
      <Navbar />

      <Box
        display={"flex "}
        flexDirection={{
          base: "column",
          lg: "column",
          xl: "row",
        }}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <Box
          alignItems={"center"}
          width={{ base: "90vw", lg: "90vw", xl: "60vw" }}
          mt={2}
        >
          <VideoPlayer width="100%" id={id} reference={videoRef} />
        </Box>

        <Box w={{ base: "90vw", lg: "90vw", xl: "30vw" }}>
          <NotesContainer id={id} videoRef={videoRef} />
        </Box>
      </Box>

      <ToastContainer />
    </Box>
  );
}
