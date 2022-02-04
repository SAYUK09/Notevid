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
import Logo from "../public/svgs/logo.svg";
import { MdHome } from "react-icons/md";
import { HiCollection } from "react-icons/hi";
import { useAuth } from "../context/authContext";

export function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = useRef();
  const { user } = useAuth();

  console.log(user.photo);

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
          bg: "dark.100",
          color: useColorModeValue("light.100", "gray.200"),
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
        <DrawerContent bgColor={useColorModeValue("#F5FAF8", "dark.100")}>
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
        borderColor={useColorModeValue("dark.100", "light.100")}
        w="96"
        display={{ base: "none", md: "flex" }}
      >
        <InputLeftElement color="brand.100" children={<BsSearch />} />
        <Input placeholder="Search for videos..." />
      </InputGroup>

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

        <Icon mx={"2"} color="brand.100" as={FaBell} cursor="pointer" />

        <Link href={"/login"}>
          <Avatar
            ml="4"
            size="sm"
            name={user?.name}
            src={user?.photo}
            cursor="pointer"
          />
        </Link>
      </Flex>
    </Flex>
  );
}
