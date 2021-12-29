import { Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import VideoPlayer from "../../components/login/videoPlay";
import axios from "axios";

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

  const paths = items.map((video: any) => {
    return { params: { id: video.id.videoId } };
  });

  console.log(paths, "paths");

  return {
    paths,
    fallback: true,
  };
}

export default function Video({ id }: any) {
  const router = useRouter();

  return (
    <Flex>
      <VideoPlayer id={id} />

      <Text>{router.isFallback ? "loading" : "Playing Video"}</Text>
    </Flex>
  );
}
