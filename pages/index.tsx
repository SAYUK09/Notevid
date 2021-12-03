import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";

const Home: NextPage = () => {
  return (
    <div>
      <Heading as="h1" size="xl" isTruncated>
        NoteVid
      </Heading>
    </div>
  );
};

export default Home;
