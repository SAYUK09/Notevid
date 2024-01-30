import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Link,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { HiCollection } from "react-icons/hi";
import { MdHome } from "react-icons/md";
import Logo from "../public/svgs/logo.svg";
import { NavItem } from "./NavItems";

export const NavbarDrawer = ({ btnRef, isOpen, onClose }: any) => {
//   const { isOpen, onClose } = useDisclosure();
  return (
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
          <Flex align="center" cursor={"pointer"}>
            <Link
              _hover={{
                textDecoration: "none",
              }}
              as={NextLink}
              href="/"
            >
              <Image width={35} height={35} src={Logo} alt="logo" />
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
          <Link
            _hover={{
              textDecoration: "none",
            }}
            as={NextLink}
            href={"/"}
          >
            <NavItem icon={MdHome}>Home</NavItem>
          </Link>
          <Link
            _hover={{
              textDecoration: "none",
            }}
            as={NextLink}
            href={"/history"}
          >
            <NavItem icon={HiCollection}>Collections</NavItem>
          </Link>
        </Flex>
      </DrawerContent>
    </Drawer>
  );
};
