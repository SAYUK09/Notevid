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
import { auth } from "../../config/firebaseConfig";
import { useAuth, IAuth } from "../../context/authContext";

export const Login = () => {
  const { user, setUser } = useAuth();

  function login() {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then(({ user: { displayName, email, photoURL, uid } }) => {
        const userData = {
          name: String(displayName),
          email: String(email),
          photo: String(photoURL),
          uid: String(uid),
        };

        localStorage.setItem("auth", JSON.stringify(userData));

        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }

  function logout() {
    localStorage.removeItem("auth");
    setUser({
      name: "",
      email: "",
      photo: "",
      uid: "",
    });

    console.log("logouted");
  }

  return (
    <Box w="100vw" h="100vh">
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.200", "#191A22")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("#F5F8FA", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          m={12}
        >
          <Heading
            lineHeight={1.1}
            color={useColorModeValue("gray.800", "#F5F8FA")}
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
                bg={"#FFC831"}
                //eslint-disable-next-line
                color="#191A22"
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
                bg={"#FFC831"}
                //eslint-disable-next-line
                color="#191A22"
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
