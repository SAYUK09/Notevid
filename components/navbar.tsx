import {
  useColorMode,
  Avatar,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Input,
  useColorModeValue,
  useDisclosure,
  DrawerCloseButton,
  DrawerHeader,
  IconButton,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FaClipboardCheck } from "react-icons/fa";
import { RiMenu4Fill } from "react-icons/ri";
import { BsFillSunFill, BsMoonFill, BsSearch } from "react-icons/bs";
import { useRef } from "react";
import Logo from "../public/svgs/logo.svg";
import { MdHome } from "react-icons/md";
import { HiCollection } from "react-icons/hi";
import { useRouter } from "next/router";

export function Navbar() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = useRef();
  const inpRef = useRef<HTMLInputElement>(null);

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

      <Box display={{ base: "none", md: "flex" }}>
        <Link href="/">
          <Image width={50} height={50} src={Logo} alt="logo" />
        </Link>
      </Box>

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
            <Link href={"/"}>
              <NavItem icon={MdHome}>Home</NavItem>
            </Link>
            <Link href={"/video-history"}>
              <NavItem icon={HiCollection}>Notes</NavItem>
            </Link>
          </Flex>
        </DrawerContent>
      </Drawer>

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

        <Avatar
          display={{ base: "none", md: "flex" }}
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
