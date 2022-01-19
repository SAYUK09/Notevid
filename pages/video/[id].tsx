import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import VideoPlayer from "../../components/login/videoPlay";
import axios from "axios";
import { Navbar } from "../../components/login/navbar";

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

  const videos = items.filter((video: any) => {
    return video.id.videoId != undefined;
  });

  const paths = videos.map((video: any) => {
    return { params: { id: video.id.videoId } };
  });

  return {
    paths,
    fallback: true,
  };
}

export default function Video({ id }: any) {
  const router = useRouter();

  return (
    <Flex
      height={"100vh"}
      wrap={"wrap"}
      justifyContent={"space-around"}
      backgroundColor={useColorModeValue("gray.100", "black.100")}
    >
      <Navbar />
      <Box
        alignItems={"center"}
        justifyContent={"center"}
        width={"60vw"}
        height={"100vh"}
        mt={2}
      >
        <VideoPlayer height="100vh" width="100%" id={id} />
      </Box>

      <Box>
        <Box
          mt={2}
          boxShadow={useColorModeValue("lg", "dark-lg")}
          rounded={"lg"}
          mx={"auto"}
          maxW={"lg"}
          py={2}
          px={6}
        >
          <Stack align={"center"}>
            <Heading py={2} fontSize={"3xl"} textAlign={"center"}>
              Notes 📝
            </Heading>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("light.100", "dark.100")}
            // boxShadow={"md"}
            p={8}
            pb={1}
            maxH={"85%"}
          >
            <Box maxH={"85%"}>
              <Box height={"60vh"} overflowY={"auto"}></Box>

              <HStack py={2} mt={"auto"}>
                <FormControl id="email" isRequired>
                  <Input
                    border="1px"
                    borderColor={useColorModeValue("dark.100", "white.100")}
                    type="email"
                  />
                </FormControl>
                <Button>Note</Button>
              </HStack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
