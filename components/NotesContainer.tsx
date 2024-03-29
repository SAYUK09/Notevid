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
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { BsDownload } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { getNotes } from "../redux/notesSlice";
import { RootState } from "../redux/store";
import { INote } from "../types";
import { toast } from "react-toastify";
import { addVideoToHistory } from "../redux/videoHistorySlice";

export default function NotesContainer({ id, videoRef }: any) {
  const noteState = useSelector((state: RootState) => state.notes.notesArr);
  const userState = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const noteInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userState?._id.length) {
      dispatch(getNotes({ userId: userState?._id, videoId: id }));
    }
  }, [userState?._id, id]);

  const printComponent = useRef<any>(null);

  const printStyle = `
  @media print {
    html, body {
   color:black !important;
      -webkit-print-color-adjust: exact;
    }
  }
  
  `;

  const handlePrint = useReactToPrint({
    content: () => printComponent.current,
    documentTitle: "Notevid",
    pageStyle: printStyle,
  });

  function getTime(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${hours}:${minutes}:${seconds}`;
  }

  function seekTo(time: number) {
    videoRef.current.seekTo(time);
  }

  async function addNote() {
    if (userState?.uid) {
      try {
        const response = await axios.post("/api/notes", {
          userId: userState?._id,
          videoId: id,
          note: noteInput?.current?.value,
          timestamp: Math.round(videoRef.current.getCurrentTime()),
        });

        if (response.status == 201) {
          if (noteInput.current) {
            noteInput.current.value = "";

            dispatch(getNotes({ userId: userState?._id, videoId: id }));
            toast.success("Note Added");
          }
        }

        dispatch(addVideoToHistory({ userId: userState?._id, videoId: id }));
      } catch (err) {
        toast.error("something went wrong");
        console.log(err);
      }
    } else {
      toast.warning("Please login to make notes");
    }
  }

  return (
    <Box
      mt={2}
      boxShadow={useColorModeValue("lg", "dark-lg")}
      rounded={"lg"}
      mx={"auto"}
      w={{ base: "90vw", lg: "90vw", xl: "30vw" }}
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
        p={4}
        pb={1}
        height={"75vh"}
        maxH={"100%"}
      >
        <Box height={"100%"} alignItems="center">
          <Box
            ref={printComponent}
            display={"flex"}
            flexDirection={"column"}
            height={"90%"}
            overflowY={"auto"}
          >
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
            <FormControl isRequired>
              <Input
                ref={noteInput}
                border="1px"
                borderColor={useColorModeValue("dark.100", "white.100")}
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addNote();
                  }
                }}
              />
            </FormControl>
            <Button onClick={addNote}>Note</Button>
            <IconButton
              onClick={handlePrint}
              aria-label="download button"
              icon={<BsDownload />}
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
