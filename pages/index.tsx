import type { NextPage } from "next";
import Head from "next/head";

// Chakra UI imports
import {
  Box,
  useColorModeValue,
  BoxProps,
  useDisclosure,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";

interface SidebarProps extends BoxProps {
  onClose: () => void;
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
    </Box>
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
          content="Sharebase is a place blog site for developers"
        />
        <meta name="author" content="macklark @github" />
      </Head>
      <Box minH="100vh" bg={useColorModeValue("yellow.100", "yellow.100")}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Box ml={{ base: 0, md: 60 }} p="5" bgColor="white">
          <Flex justifyContent="right" alignItems="center">
            <Button
              colorScheme="yellow"
              variant="outline"
              _hover={{ shadow: "md" }}
            >
              Login
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Home;
