// Chakra UI imports
import {
  Flex,
  Stack,
  Heading,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

// React imports
import { useState } from "react";

// Supabase client import
import { client } from "../utils/client";
import Head from "next/head";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function login() {
    const { error } = await client.auth.signIn({
      email,
    });

    if (error) {
      console.log({ error });
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        minH={"50vh"}
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          ✨Magic Link sent !✨
        </AlertTitle>
        <AlertDescription maxWidth="sm">Check your email</AlertDescription>
      </Alert>
    );
  }

  return (
    <Flex minH={"50vh"} align={"center"} justify={"center"}>
      <Head>
        <title>Sharebase - Login</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width = device-width"
        />
        <meta name="description" content="Login | Sharebase" />
        <meta name="author" content="macklark @github" />
      </Head>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          ⚡Sharebase | Login
        </Heading>
        <Input
          placeholder="email@example.com"
          _placeholder={{ color: "gray.500" }}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Stack spacing={6}>
          <Button
            bg={"black"}
            color={"#FFFF00"}
            _hover={{ bg: "#FFFF00", color: "black" }}
            onClick={() => login()}
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
