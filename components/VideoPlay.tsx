import { Flex } from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer({ id, reference }: any) {
  return (
    <Flex>
      <ReactPlayer
        ref={reference}
        controls={true}
        height={"85vh"}
        width={"100%"}
        url={`https://www.youtube.com/watch?v=${id}`}
      />
    </Flex>
  );
}
