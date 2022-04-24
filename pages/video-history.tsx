import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../components/navbar";
import { useAuth } from "../context/authContext";
import { RootState } from "../redux/store";
import { getVideoHistory } from "../redux/videoHistorySlice";

const VideoHistory: NextPage = () => {
  const dispatch = useDispatch();
  const videoHistoryArr = useSelector(
    (state: RootState) => state.history.videoHistoryArr
  );
  const { user } = useAuth();

  dispatch(getVideoHistory({ userId: "1" }));

  return (
    <Flex>
      <Navbar />
    </Flex>
  );
};

export default VideoHistory;
