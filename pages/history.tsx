import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { addVideoToHistory, getVideoHistory } from "../redux/videoHistorySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAuth } from "../context/authContext";

const History: NextPage = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const vidHistState = useSelector(
    (state: RootState) => state.videoHistory.videoHistoryArr
  );

  useEffect(() => {
    dispatch(getVideoHistory({ userId: user?._id }));
  }, [user?._id]);

  return <Box>Video History</Box>;
};

export default History;
