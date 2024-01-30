import React, { useEffect } from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { NextPage } from "next";
import { addVideoToHistory, getVideoHistory } from "../redux/videoHistorySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import VideoCard from "../components/videoCard";
import { Navbar } from "../components/navbar";

const History: NextPage = () => {
  const userState = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  const vidHistState = useSelector(
    (state: RootState) => state.videoHistory.videoHistoryArr
  );

  useEffect(() => {
    userState?._id.length &&
      dispatch(getVideoHistory({ userId: userState?._id }));
  }, [userState?._id]);

  return (
    <Box>
      <Navbar />
      <Heading py={"8"} textAlign={"center"}>
        All Your Notes At One Place
      </Heading>
      <SimpleGrid
        m={"10"}
        justifyContent={"center"}
        alignItems={"center"}
        minChildWidth="17rem"
        spacing="8"
      >
        {vidHistState.map((item) => {
          return (
            <VideoCard
              key={item.id}
              imageUrl={item.snippet.thumbnails.medium.url}
              imageAlt={item.snippet.localized.title}
              title={item.snippet.localized.title}
              channel={item.snippet.channelTitle}
              id={item.id}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default History;
