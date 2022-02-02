import {
  Box,
  useColorModeValue,
  HStack,
  FormControl,
  Input,
  Button,
  Text,
  Stack,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/authContext";
import { getNotes } from "../redux/notesSlice";
import { RootState } from "../redux/store";
import { INote } from "../types";

export default function NotesContainer({ id, videoRef }: any) {
  const noteState = useSelector((state: RootState) => state.notes.notesArr);
  const dispatch = useDispatch();
  const noteInput = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const componentRef = useRef<any>(null);

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
    videoRef.current.seekTo(time);
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
          timestamp: Math.round(videoRef.current.getCurrentTime()),
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
        ref={componentRef}
        rounded={"lg"}
        bg={useColorModeValue("light.100", "dark.100")}
        p={8}
        pb={1}
        height={"75vh"}
        maxH={"100%"}
      >
        <Box>
          <Box bgColor={"green"} alignItems={"center"} overflowY={"auto"}></Box>
          <Box display={"flex"} flexDirection={"column"} height={"60vh"}>
            {noteState.map((item: INote, index: number) => {
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

          <HStack py={2} mt={"auto"} display={"flex"} alignSelf={"flex-end"}>
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
  );
}
