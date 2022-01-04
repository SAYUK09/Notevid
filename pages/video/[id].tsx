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
    // <SimpleGrid m={2} columns={[1, 2]}>
    //   <Box
    //     backgroundColor={"yellow"}
    //     alignItems={"center"}
    //     justifyContent={"center"}
    //     width={"90vw"}
    //   >
    //     <VideoPlayer id={id} />
    //   </Box>

    //   <Box maxW={5} backgroundColor={"black"}>
    //     <Text>{router.isFallback ? "loading" : "Playing Video"}</Text>
    //   </Box>
    // </SimpleGrid>

    <Flex height={"100vh"} wrap={"wrap"}>
      <Box
        backgroundColor={"yellow"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"60%"}
      >
        <Box height={"500px"} minH={"300px"} width={"100%"}>
          <VideoPlayer height="100%" width="100%" id={id} />
        </Box>
      </Box>

      <Box maxH={"100vh"} backgroundColor={"black"}>
        <Box mx={"auto"} maxW={"lg"} py={2} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Notes
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Note all of it down! 📝
            </Text>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            maxH={"90%"}
          >
            <Box maxH={"90%"}>
              <Box height={"70vh"} overflowY={"auto"}>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>
                <h1>LLALA</h1>

                {/* <Button minH={20}>LALAL</Button>
                <Button minH={20}>LALAL</Button>
                <Button minH={20}>LALAL</Button>
                <Button minH={20}>LALAL</Button>
                <Button minH={20}>LALAL</Button>
                <Button minH={20}>LALAL</Button>
                <Button minH={20}>LALAL</Button> */}
              </Box>

              <HStack mt={"auto"}>
                <FormControl id="email" isRequired>
                  <Input type="email" />
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
