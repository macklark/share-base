import type { NextPage } from "next";
import Head from "next/head";

// Chakra UI imports
import {
  Box,
  useColorModeValue,
  BoxProps,
  FlexProps,
  useDisclosure,
  Flex,
  Text,
  Button,
  Link,
  Icon,
} from "@chakra-ui/react";

// React icons import
import { FcHome } from "react-icons/fc";

import { ReactText } from "react";
import { IconType } from "react-icons";

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
      <NavButtons icon={FcHome}>Home</NavButtons>
    </Box>
  );
};

const NavButtons = ({ icon, children, ...rest }: NavButtonProps) => {
  return (
    <Link
      href="/"
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
        color={"cyan.500"}
        _hover={{ bg: "cyan.500", color: "white" }}
        {...rest}
      >
        <Icon mr="4" fontSize="16" _hover={{ color: "white" }} as={icon} />
        {children}
      </Flex>
    </Link>
  );
};

const Home: NextPage = () => {
  const { onClose } = useDisclosure();

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
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Box ml={{ base: 0, md: 60 }} p="5" bgColor="white">
          <Flex justifyContent="right" alignItems="center">
            <Link
              bg={"white"}
              border={"1px"}
              borderColor="cyan.500"
              _hover={{ shadow: "md", bg: "cyan.500", color: "white" }}
              p={2}
              px={3}
              borderRadius="md"
              href="/login"
              fontSize="xl"
              fontWeight="bold"
              color="cyan.500"
            >
              Login
            </Link>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Home;
