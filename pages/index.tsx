import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "../utils/authContext";
import SidebarContent from "../components/sidebarContent";
import React from "react";

// Chakra UI imports
import {
  Box,
  useDisclosure,
  Flex,
  Text,
  Link,
  Button,
  Stack,
  Heading,
} from "@chakra-ui/react";

// React icons import
import { FaPencilAlt } from "react-icons/fa";
import { client } from "../utils/client";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";

import Feed from "../components/feed";

export const getStaticProps: GetStaticProps = async () => {
  let { data: blogs, error } = await client.from("blogs").select("*");

  if (error) {
    console.log(error);
  }

  return {
    props: {
      blogs,
    },
  };
};

const Hero = (): JSX.Element => {
  return (
    <Stack as={Box} textAlign={"center"} py={{ base: 20, md: 14 }}>
      <Heading
        fontWeight={"bold"}
        fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
      >
        Your one stop <br />
        <Text as={"span"} color={"cyan.500"}>
          Blog site
        </Text>
      </Heading>
      <Stack
        direction={"column"}
        spacing={3}
        align={"center"}
        alignSelf={"center"}
        mt={"2em"}
      >
        <Link href="/new" color={"white"}>
          <Button
            bg={"cyan.500"}
            leftIcon={<FaPencilAlt />}
            _hover={{ bg: "cyan.400" }}
            color={"white"}
            mt={"2em"}
            fontSize={{ base: "lg", md: "2xl" }}
            p={{ base: "4", md: "6" }}
          >
            WRITE
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

type blogProps = {
  blogs: Array<{}>;
};

const Home: React.FC<blogProps> = ({ blogs }) => {
  const { onClose } = useDisclosure();
  const { isUserAuthenticated } = useAuth();
  const router = useRouter();

  async function signOut() {
    await client.auth.signOut();
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Sharebase - One place blog site</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width = device-width"
        />
        <meta
          name="description"
          content="Sharebase is a one place blog site for developers"
        />
        <meta name="author" content="macklark @github" />
      </Head>
      <Box minH="100vh">
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Box ml={{ base: 0, md: 60 }} p="5" bgColor="white">
          <Flex justifyContent="right" alignItems="center">
            {isUserAuthenticated === "not-authenticated" && (
              <Link
                bg={"white"}
                border={"1px"}
                borderColor="cyan.500"
                _hover={{ shadow: "md", bg: "cyan.500", color: "white" }}
                p={2}
                px={3}
                borderRadius="md"
                href="/login"
                fontSize="lg"
                fontWeight="bold"
                color="cyan.500"
              >
                Login
              </Link>
            )}
            {isUserAuthenticated === "authenticated" && (
              <Button
                bg={"white"}
                border={"1px"}
                borderColor="cyan.500"
                _hover={{ shadow: "md", bg: "cyan.500", color: "white" }}
                p={2}
                px={3}
                borderRadius="md"
                fontSize="lg"
                fontWeight="bold"
                color="cyan.500"
                onClick={signOut}
              >
                Logout
              </Button>
            )}
          </Flex>
        </Box>
        {isUserAuthenticated === "authenticated" && <Feed blogs={blogs} />}
        {isUserAuthenticated === "not-authenticated" && <Hero />}
      </Box>
    </>
  );
};

export default Home;
