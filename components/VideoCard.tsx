import {
  Avatar,
  Box,
  Flex,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import NextLink from "next/link";
import { IVideoCard } from "../types";
import React from "react";

export default function VideoCard({
  imageUrl,
  imageAlt,
  title,
  channel,
  id,
}: IVideoCard) {
  return (
    <Flex justifyContent={"center"}>
      <Link
        href={`/video/${id}`}
        as={NextLink}
        _hover={{ textDecoration: "none" }}
      >
        <Box bg={useColorModeValue("gray.100", "gray.800")} maxW="sm">
          <Image src={imageUrl} alt={imageAlt} rounded="lg" />
          <Box py="2">
            <Box display="flex" alignItems="center">
              <Avatar my={1} size="sm" name={channel} src="" cursor="pointer" />

              <Box
                color={useColorModeValue("gray.800", "light.100")}
                fontWeight="semibold"
                letterSpacing="wide"
                ml="2"
                maxW={"15rem"}
              >
                <Text fontSize={"lg"} noOfLines={2} lineHeight={"1.1"}>
                  {title}
                </Text>
              </Box>
            </Box>
            <Box
              color={useColorModeValue("gray.800", "light.100")}
              fontWeight="semibold"
              letterSpacing="wide"
              ml="10"
              fontSize={"sm"}
              mt={"1"}
            >
              <Text>{channel}</Text>
            </Box>
          </Box>
        </Box>
      </Link>
    </Flex>
  );
}
