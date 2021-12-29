import { Flex } from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer({ id }: any) {
  return (
    <Flex>
      <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} />
    </Flex>
  );
}
