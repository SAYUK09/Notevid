import { Box, useColorModeValue, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import VideoPlayer from "../../components/videoPlay";
import axios from "axios";
import { Navbar } from "../../components/navbar";
import { useAuth } from "../../context/authContext";
import { ParsedUrlQuery } from "querystring";
import { useDispatch } from "react-redux";
import { getNotes } from "../../redux/notesSlice";
import NotesContainer from "../../components/notesContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Params = {
  params: {
    id: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const id = params.id;
  return {
    props: {
      id,
    },
  };
}

export async function getStaticPaths() {
  const {
    data: { items },
  } = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=javscript%2C%20podcast%2C%20startup&key=${process.env.NEXT_PUBLIC_YOUTUBE_API}&regionCode=in`
  );

  const videos = items.filter((video: any) => video.id.videoId != undefined);

  const paths = videos.map((video: any) => {
    return {
      params: {
        id: video.id.videoId,
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export default function Video({ id }: ParsedUrlQuery) {
  const router = useRouter();
  const { user } = useAuth();
  const dispatch = useDispatch();

  const videoRef = useRef<any>();

  useEffect(() => {
    dispatch(getNotes({ userId: user?._id, videoId: id }));
  }, [user]);

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

      <ToastContainer theme="dark" />
    </Box>
  );
}
