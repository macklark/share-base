import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "../utils/authContext";

// Chakra UI imports
import {
  Box,
  useColorModeValue,
  BoxProps,
  FlexProps,
  useDisclosure,
  Flex,
  Text,
  Link,
  Icon,
  Button,
  Stack,
  Heading,
} from "@chakra-ui/react";

// React icons import
import { BiHomeAlt } from "react-icons/bi";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineTag } from "react-icons/ai";

import { ReactText } from "react";
import { IconType } from "react-icons";
import { client } from "../utils/client";
import { useRouter } from "next/router";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface NavButtonProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}

// Sidebar component
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      position="fixed"
      height="full"
      {...rest}
    >
      <Flex
        height="20"
        alignItems="center"
        justifyContent="space-between"
        mx="7"
      >
        <Text fontSize="2xl" fontWeight="bold">
          ⚡ Sharebase
        </Text>
      </Flex>
      <NavButtons icon={BiHomeAlt}>Home</NavButtons>
      <NavButtons icon={AiOutlineTag}>Tags</NavButtons>
    </Box>
  );
};

const NavButtons = ({ icon, children, ...rest }: NavButtonProps) => {
  return (
    <Link
      href="/tags"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="3"
        mx="4"
        borderRadius="md"
        role="group"
        cursor="pointer"
        bg={"white"}
        _hover={{ bg: "cyan.500", color: "white" }}
        {...rest}
      >
        <Icon
          mr="4"
          fontSize="16"
          _hover={{ color: "white" }}
          as={icon}
          w={6}
          h={6}
        />
        {children}
      </Flex>
    </Link>
  );
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
      </Stack>
    </Stack>
  );
};

const Home: NextPage = () => {
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
        <Hero />
      </Box>
    </>
  );
};

export default Home;
