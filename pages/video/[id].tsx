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
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import VideoPlayer from "../../components/login/videoPlay";
import axios from "axios";
import { Navbar } from "../../components/login/navbar";
import { useAuth } from "../../context/authContext";
import { INotes } from "../../types";
import { ParsedUrlQuery } from "querystring";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../redux/notesSlice";

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
  const [notes, setNotes] = useState<INotes[] | []>([]);
  const noteInput = useRef<HTMLInputElement>(null);
  const noteState = useSelector((state: RootState) => state.notes.notesArr);
  const dispatch = useDispatch();

  const ref = useRef<any>();

  useEffect(() => {
    dispatch(getNotes({ userId: user?._id, videoId: id }));
  }, [user]);

  function getTime(time: number) {
    let hour, min, sec;
    time = time;
    hour = time / 3600;
    time = time % 3600;
    min = time / 60;
    time = time % 60;
    sec = time;

    return `${Math.round(hour)}:${Math.round(min)}:${Math.round(sec)}`;
  }

  function seekTo(time: number) {
    ref.current.seekTo(time);
  }
  async function addNote(e: any) {
    if (
      e.key === "Enter" ||
      (e.type === "click" && noteInput.current?.value.length)
    ) {
      try {
        const response = await axios.post("/api/notes", {
          userId: user._id,
          videoId: id,
          note: noteInput?.current?.value,
          timestamp: Math.round(ref.current.getCurrentTime()),
        });

        if (response.status == 201) {
          if (noteInput.current) {
            noteInput.current.value = "";

            dispatch(getNotes({ userId: user?._id, videoId: id }));
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

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
        <VideoPlayer height="100vh" width="100%" id={id} reference={ref} />
      </Box>

      <Box>
        <Box
          mt={2}
          boxShadow={useColorModeValue("lg", "dark-lg")}
          rounded={"lg"}
          mx={"auto"}
          minW={"30vw"}
          py={2}
          px={6}
          maxH={"90vh"}
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
            height={"75vh"}
            maxH={"100%"}
          >
            <Box>
              <Box
                bgColor={"green"}
                alignItems={"center"}
                overflowY={"auto"}
              ></Box>
              <Box display={"flex"} flexDirection={"column"} height={"60vh"}>
                {noteState.map((item: INotes, index: number) => {
                  return (
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      key={index}
                      my={1}
                      width={"100%"}
                    >
                      <Text>{item.note}</Text>
                      <Text
                        _hover={{ color: "blue.100" }}
                        fontWeight={"medium"}
                        cursor={"pointer"}
                        onClick={() => {
                          seekTo(item.timestamp);
                        }}
                      >
                        {getTime(item.timestamp)}
                      </Text>
                    </Box>
                  );
                })}
              </Box>

              <HStack
                py={2}
                mt={"auto"}
                display={"flex"}
                alignSelf={"flex-end"}
              >
                <FormControl id="email" isRequired>
                  <Input
                    ref={noteInput}
                    border="1px"
                    borderColor={useColorModeValue("dark.100", "white.100")}
                    type="text"
                    onKeyDown={(e) => {
                      addNote(e);
                    }}
                  />
                </FormControl>

                <Button onClick={addNote}>Note</Button>
              </HStack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
