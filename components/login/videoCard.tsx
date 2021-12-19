/* eslint-disable react/no-children-prop */
import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import React from "react";

export default function VideoCard({
  imageUrl,
  imageAlt,
  date,
  views,
  title,
}: any) {
  return (
    <Flex justifyContent={"center"}>
      <Box bg={useColorModeValue("white", "gray.800")} maxW="sm">
        <Image src={imageUrl} alt={imageAlt} rounded="lg" />
        <Box py="2">
          <Box d="flex" alignItems="center">
            <Avatar
              my={1}
              size="sm"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/68416000?v=4"
              cursor="pointer"
            />

            <Box
              color={useColorModeValue("gray.800", "#F5F8FA")}
              fontWeight="semibold"
              letterSpacing="wide"
              ml="2"
            >
              <Text fontSize={"lg"} isTruncated>
                {title}
              </Text>
              <Text
                p="0"
                m="0"
                fontSize={"xs"}
                textColor={useColorModeValue("gray.700", "gray.400")}
              >
                Channel Name
              </Text>
            </Box>
          </Box>
          <Box
            color={useColorModeValue("gray.800", "#F5F8FA")}
            fontWeight="semibold"
            letterSpacing="wide"
            ml="10"
            mt={"2px"}
          >
            <Text
              fontSize={"xs"}
              textColor={useColorModeValue("gray.700", "gray.400")}
            >
              {date} <span style={{ color: "#FFC831" }}>&bull; </span>
              {views}
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
