// Chakra UI imports
import { Flex, Stack, Heading, Input, Button } from "@chakra-ui/react";

// React imports
import { useState } from "react";

// Supabase client import
import { client } from "../utils/client";

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
    return <h1>Check your email !</h1>;
  }

  return (
    <Flex minH={"50vh"} align={"center"} justify={"center"}>
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
