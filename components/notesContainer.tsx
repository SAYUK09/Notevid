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
import React, { useRef } from "react";
import { BsDownload } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
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

  const printStyle = `
  @media print {
    html, body {
   color:black !important;
      -webkit-print-color-adjust: exact;
    }
  }
  
  `;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Notevid",
    pageStyle: printStyle,
  });

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

  async function addNote() {
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
        rounded={"lg"}
        bg={useColorModeValue("light.100", "dark.100")}
        p={4}
        pb={1}
        height={"75vh"}
        maxH={"100%"}
      >
        <Box>
          <Box alignItems={"center"} overflowY={"auto"}></Box>
          <Box
            ref={componentRef}
            display={"flex"}
            flexDirection={"column"}
            height={"60vh"}
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
            <FormControl id="email" isRequired>
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
