/* eslint-disable react/no-children-prop */
import {
  useColorMode,
  Avatar,
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
  Heading,
  Button,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsFillSunFill, BsGearFill, BsMoonFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import React from "react";
import { Navbar } from "./navbar";

export default function HomeLayout() {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const NavItem = (props: any) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={useColorModeValue("inherit", "gray.400")}
        _hover={{
          bg: useColorModeValue("gray.100", "gray.900"),
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              //eslint-disable-next-line
              color: useColorModeValue("gray.600", "gray.300"),
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props: any) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("white", "#191A22")}
      borderColor={useColorModeValue("inherit", "gray.600")}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text
          fontSize="2xl"
          ml="2"
          color={useColorModeValue("brand.500", "white")}
          fontWeight="semibold"
        >
          Choc UI
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={MdHome}>Home</NavItem>
        <NavItem icon={FaRss}>Articles</NavItem>
        <NavItem icon={HiCollection}>Collections</NavItem>
        <NavItem icon={FaClipboardCheck}>Checklists</NavItem>

        <NavItem icon={AiFillGift}>Changelog</NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem>
      </Flex>
    </Box>
  );
  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          pos="sticky"
          top="0"
          as="header"
          align="center"
          justify="space-between"
          w={"full"}
          px="6"
          bg={useColorModeValue("white", "#191A22")}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <Button
            textAlign={"center"}
            padding={"0"}
            borderRadius={"50%"}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <BsMoonFill /> : <BsFillSunFill />}
          </Button>
          <InputGroup w="96" display={{ base: "none", md: "flex" }}>
            <InputLeftElement color="gray.500" children={<FiSearch />} />
            <Input placeholder="Search for articles..." />
          </InputGroup>

          <Flex align="center">
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/68416000?v=4"
              cursor="pointer"
            />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>
          <Heading>LALA</Heading>

          <Heading>LALA</Heading>
        </Box>
      </Box>
    </Box>
  );
}
