import {
  useColorMode,
  Avatar,
  Flex,
  Input,
  useColorModeValue,
  useDisclosure,
  IconButton,
  Box,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { RiMenu4Fill } from "react-icons/ri";
import { BsFillSunFill, BsMoonFill, BsSearch } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import Logo from "../public/svgs/logo.svg";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { NavbarDrawer } from "./NavbarDrawer";

export default function Navbar() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = useRef();
  const inpRef = useRef<HTMLInputElement>(null);

  const userState = useSelector((state: RootState) => state.auth.user);

  function redirectToVideoPage() {
    // value from the search/input bar
    const inpText = inpRef.current?.value;

    // conditional check to identify different varient of youtube url
    if (inpText?.includes(".be")) {
      const videoId = inpText.substring(17, 28);
      router.push(`/video/${videoId}`);
    } else {
      const videoId = inpText?.substring(inpText.indexOf("=") + 1);

      router.push(`/video/${videoId}`);
    }
  }

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w={"full"}
      px="6"
      bg={useColorModeValue("light.100", "dark.100")}
      borderBottomWidth="1px"
      borderColor={useColorModeValue("inherit", "gray.700")}
      h="14"
    >
      <IconButton
        borderColor={useColorModeValue("dark.100", "light.100")}
        ref={btnRef}
        onClick={onOpen}
        variant="outline"
        color="brand.100"
        aria-label="Menu"
        icon={<RiMenu4Fill />}
      />

      <Box display={{ base: "none", md: "flex" }} cursor={"pointer"}>
        <Link
          _hover={{
            textDecoration: "none",
          }}
          as={NextLink}
          href="/"
        >
          <Image width={35} height={35} src={Logo} alt="logo" />
        </Link>
      </Box>

      <NavbarDrawer
        btnRef={btnRef}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Flex
        rounded={4}
        px={2}
        border="1px"
        borderColor={useColorModeValue("dark.100", "light.100")}
        alignItems={"center"}
        w={"60%"}
      >
        <IconButton
          color="brand.100"
          background={"transparent"}
          aria-label="Search-icon"
          icon={<BsSearch />}
        />
        <Input
          variant="unstyled"
          placeholder="Paste the video URL"
          w="96"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              redirectToVideoPage();
            }
          }}
          ref={inpRef}
        />
      </Flex>

      <Flex px={"2"} align="center">
        <IconButton
          padding={"0"}
          borderRadius={"50%"}
          onClick={toggleColorMode}
          color="brand.100"
          aria-label="dark-mode-toggle"
          mx={"2"}
        >
          {colorMode === "light" ? <BsMoonFill /> : <BsFillSunFill />}
        </IconButton>

        <Link as={NextLink} href="/login">
          <Avatar
            ml="4"
            size="sm"
            name={userState?.name}
            src={userState?.photo}
            cursor="pointer"
          />
        </Link>
      </Flex>
    </Flex>
  );
}
