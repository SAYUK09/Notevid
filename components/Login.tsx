import React from "react";
import Image from "next/image";
import TopblobSvg from "../public/svgs/topBlob.svg";
import BottomblobSvg from "../public/svgs/bottomBlob.svg";
import {
  Button,
  Text,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import Styles from "../styles/loginPage.module.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, logoutUser } from "../redux/authSlice";
import { RootState } from "../redux/store";

export default function Login() {
  const userState = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();

  function login() {
    const googleProvider = new GoogleAuthProvider();
    console.log("enter");
    signInWithPopup(auth, googleProvider)
      .then(async ({ user: { displayName, email, photoURL, uid } }) => {
        const userData = {
          name: String(displayName),
          email: String(email),
          photo: String(photoURL),
          uid: String(uid),
        };

        dispatch(registerUser(userData));

        toast.success("Logged in successful");
        router.back();
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }

  function logout() {
    dispatch(logoutUser());
    toast.success("logged out! See you soon.");
    router.push("/");
  }

  return (
    <Box w="100vw" h="100vh">
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.200", "dark.100")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("light.100", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          m={12}
        >
          <Heading
            lineHeight={1.1}
            color={useColorModeValue("gray.800", "light.100")}
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            {userState?.uid ? "Logout" : "Sign in with Google "}
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            {userState?.uid ? "See you soon!" : "Login in within seconds! "}
          </Text>

          <Stack spacing={6}>
            {userState?.uid.length ? (
              <Button
                onClick={logout}
                bg={"brand.100"}
                //eslint-disable-next-line
                color="dark.100"
                _hover={{
                  bg: "#1F73FB",
                  color: "white",
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={login}
                bg={"brand.100"}
                //eslint-disable-next-line
                color="dark.100"
                _hover={{
                  bg: "#1F73FB",
                  color: "white",
                }}
              >
                Sign In
              </Button>
            )}
          </Stack>
        </Stack>
      </Flex>

      <Box className={Styles.topBlob}>
        <Image src={TopblobSvg} alt={"blobImage"} />
      </Box>

      <Box className={Styles.bottomBlob}>
        <Image src={BottomblobSvg} className={"bloby"} alt={"blobImage"} />
      </Box>

      <ToastContainer theme="dark" />
    </Box>
  );
};
