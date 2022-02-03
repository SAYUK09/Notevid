import React from "react";
import Image from "next/image";
import TopblobSvg from "../../public/svgs/topBlob.svg";
import BottomblobSvg from "../../public/svgs/bottomBlob.svg";
import {
  Button,
  Text,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import Styles from "../../styles/loginPage.module.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { IAuthUser, IRegisterUser } from "../types";
import { animateVisualElement } from "framer-motion";

export const Login = () => {
  const { user, setUser } = useAuth();

  console.log(user);

  function login() {
    const googleProvider = new GoogleAuthProvider();
    console.log("enter");
    signInWithPopup(auth, googleProvider)
      .then(({ user: { displayName, email, photoURL, uid } }) => {
        const userData = {
          name: String(displayName),
          email: String(email),
          photo: String(photoURL),
          uid: String(uid),
        };
        console.log(userData, "uuuu");
        registerUser(userData);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }

  async function registerUser(userData: IRegisterUser) {
    console.log(userData, "userData");
    const {
      data: { data },
    } = await axios.post("/api/user", userData);

    // const wth = await axios.post("/api/user", userData);

    // console.log(wth, "dataS");

    const { name, email, uid, photo, _id } = data;

    console.log(name, email, uid, photo, _id, "popop");

    localStorage.setItem(
      "auth",
      JSON.stringify({ name, email, uid, photo, _id })
    );
    setUser({ name, email, uid, photo, _id });
    console.log(data);
  }

  function logout() {
    localStorage.removeItem("auth");
    setUser({
      name: "",
      email: "",
      photo: "",
      uid: "",
      _id: "",
    });

    console.log("logouted");
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
            {user.uid ? "Logout" : "Sign in with Google "}
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            {user.uid ? "See you soon!" : "Login in within seconds! "}
          </Text>

          <Stack spacing={6}>
            {user.uid.length ? (
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
    </Box>
  );
};
