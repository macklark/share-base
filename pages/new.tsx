import { Box, Input, Heading, Textarea, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { client } from "../utils/client";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await client.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      props: {},
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

const New = (): JSX.Element => {
  const router = useRouter();
  const newBlog = async (e: any) => {
    e.preventDefault();

    const reqBody = {
      title: e.target.title.value,
      description: e.target.description.value,
    };

    fetch("/api/postBlog", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/");
  };

  return (
    <Box w={["100%", "75%"]} mx="auto" padding="4">
      <form onSubmit={newBlog}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Heading>New Blog</Heading>
          <Button variant={"outline"} colorScheme={"teal"} type="submit">
            Post
          </Button>
        </Flex>
        <Input
          placeholder="Title"
          mt="2em"
          size="lg"
          variant="flushed"
          fontSize={{ base: "lg", md: "4xl" }}
          required
          type="text"
          id="title"
          name="title"
        />
        <Textarea
          placeholder="Description"
          mt="2em"
          size="lg"
          fontSize={{ base: "lg", md: "4xl" }}
          rows={9}
          required
          id="description"
          name="description"
        />
      </form>
    </Box>
  );
};

export default New;
