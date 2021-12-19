import {
  useColorMode,
  Avatar,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  useDisclosure,
  DrawerCloseButton,
  DrawerHeader,
  IconButton,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FaBell, FaClipboardCheck } from "react-icons/fa";
import { RiMenu4Fill } from "react-icons/ri";
import { BsFillSunFill, BsMoonFill, BsSearch } from "react-icons/bs";
import { useRef } from "react";
import Logo from "../../public/svgs/logo.svg";
import { MdHome } from "react-icons/md";
import { HiCollection } from "react-icons/hi";

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = useRef();

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
          bg: "#191A22",
          color: useColorModeValue("#F5F8FA", "gray.200"),
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
              color: "191A22",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w={"full"}
      px="6"
      bg={useColorModeValue("#F5F8FA", "#191A22")}
      borderBottomWidth="1px"
      borderColor={useColorModeValue("inherit", "gray.700")}
      h="14"
    >
      <IconButton
        borderColor={useColorModeValue("#191A22", "#F5F8FA")}
        ref={btnRef}
        onClick={onOpen}
        variant="outline"
        color="#FFC831"
        aria-label="Menu"
        icon={<RiMenu4Fill />}
      />

      <Link href="/">
        <a>
          <Image width={50} height={50} src={Logo} alt="logo" />
        </a>
      </Link>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton alignSelf={"center"} />

          <DrawerHeader>
            <Flex align="center">
              <Link href="/">
                <a>
                  <Image width={50} height={50} src={Logo} alt="logo" />
                </a>
              </Link>
            </Flex>
          </DrawerHeader>

          <Flex
            direction="column"
            as="nav"
            fontSize="sm"
            color="gray.600"
            aria-label="Main Navigation"
          >
            <NavItem icon={MdHome}>Home</NavItem>
            <NavItem icon={HiCollection}>Collections</NavItem>
            <NavItem icon={FaClipboardCheck}>Liked Videos</NavItem>
          </Flex>
        </DrawerContent>
      </Drawer>

      <InputGroup
        borderColor={useColorModeValue("#191A22", "#F5F8FA")}
        w="96"
        display={{ base: "none", md: "flex" }}
      >
        <InputLeftElement color="#FFC831" children={<BsSearch />} />
        <Input placeholder="Search for videos..." />
      </InputGroup>

      <Flex px={"2"} align="center">
        <IconButton
          padding={"0"}
          borderRadius={"50%"}
          onClick={toggleColorMode}
          color="#FFC831"
          aria-label="dark-mode-toggle"
          mx={"2"}
        >
          {colorMode === "light" ? <BsMoonFill /> : <BsFillSunFill />}
        </IconButton>

        <Icon mx={"2"} color="#FFC831" as={FaBell} cursor="pointer" />
        <Avatar
          ml="4"
          size="sm"
          name="anubra266"
          src="https://avatars.githubusercontent.com/u/68416000?v=4"
          cursor="pointer"
        />
      </Flex>
    </Flex>
  );
}
