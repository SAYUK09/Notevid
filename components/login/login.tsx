import React from "react";
import {
  Button,
  Text,
  Flex,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import Styles from "../../styles/loginPage.module.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { AuthUser, useAuth } from "../../context/authContext";

export const Login = () => {
  const { user, setUser }: any = useAuth();

  function login() {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then(({ user: { displayName, email, photoURL, uid } }) => {
        const userData = {
          name: displayName,
          email: email,
          photo: photoURL,
          uid: uid,
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

      <Box className={`${Styles.blob} ${Styles.topBlob}`}>
        <svg
          width="1000"
          height="1000"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="linearGradientId"
              gradientTransform="rotate(60 0.5 0.5)"
            >
              <stop offset="0%" stopColor="#03033c"></stop>
              <stop offset="100%" stopColor="#1473FB"></stop>
            </linearGradient>
            <clipPath id="shape">
              <path
                fill="currentColor"
                d="M787.5,633Q654,766,483.5,794.5Q313,823,204,661.5Q95,500,199,329Q303,158,499.5,159Q696,160,808.5,330Q921,500,787.5,633Z"
              ></path>
            </clipPath>
          </defs>
          <g clipPath="url(#shape)">
            <path
              fill="url(#linearGradientId)"
              d="M787.5,633Q654,766,483.5,794.5Q313,823,204,661.5Q95,500,199,329Q303,158,499.5,159Q696,160,808.5,330Q921,500,787.5,633Z"
            ></path>
          </g>
        </svg>
      </Box>

      <Box className={`${Styles.blob} ${Styles.bottomBlob}`}>
        <svg
          width="1000"
          height="1000"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="radialGradientId" r="100%" cx="43%" cy="45%">
              <stop offset="0%" stopColor="#ffc831" />
              <stop offset="100%" stopColor="#F76B1C" />
            </radialGradient>

            <clipPath id="shape">
              <path
                fill="currentColor"
                d="M770,693.5Q626,887,383.5,824Q141,761,136.5,497Q132,233,378.5,173.5Q625,114,769.5,307Q914,500,770,693.5Z"
              ></path>
            </clipPath>
          </defs>

          <g clipPath="url(#shape)">
            <path
              fill="url(#radialGradientId)"
              d="M770,693.5Q626,887,383.5,824Q141,761,136.5,497Q132,233,378.5,173.5Q625,114,769.5,307Q914,500,770,693.5Z"
            />
          </g>
        </svg>
      </Box>
    </Box>
  );
};
