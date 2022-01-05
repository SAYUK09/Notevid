import {
  Text,
  SimpleGrid,
  Box,
  Grid,
  GridItem,
  Wrap,
  WrapItem,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  useColorModeValue,
  VStack,
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

  const paths = items.map((video: any) => {
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
      <Box alignItems={"center"} justifyContent={"center"} width={"60vw"}>
        <Box height={"500px"} minH={"300px"} width={"100%"}>
          <VideoPlayer height="100%" width="100%" id={id} />
        </Box>
      </Box>

      <Box>
        <Box
          border="1px"
          borderColor={useColorModeValue("white.100", "dark.100")}
          rounded={"lg"}
          mx={"auto"}
          maxW={"lg"}
          py={2}
          px={6}
        >
          <Stack align={"center"}>
            <Heading fontSize={"3xl"} textAlign={"center"}>
              Notes
            </Heading>
            <Text fontSize={"sm"} color={"gray.600"}>
              Note all of it down! 📝
            </Text>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("light.100", "dark.100")}
            boxShadow={"lg"}
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
