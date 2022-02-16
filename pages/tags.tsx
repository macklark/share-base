import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Flex,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { GetStaticProps } from "next/types";
import { client } from "../utils/client";
import Head from "next/head";

export const getStaticProps: GetStaticProps = async () => {
  const { data: tags } = await client.from("tags").select("*");

  return {
    props: {
      tags,
    },
  };
};

export default function Tags(props: any): JSX.Element {
  let { tags } = props;
  return (
    <Box w={["100%", "50%"]} mx="auto" padding="4">
      <Head>
        <title>Sharebase - Tags</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width = device-width"
        />
        <meta name="description" content="Personalize your sharebase feed" />
        <meta name="author" content="macklark @github" />
      </Head>
      <Heading>Tags</Heading>
      <Text
        textTransform={"uppercase"}
        color={"gray.500"}
        mt="9px"
        fontWeight={"bold"}
      >
        personalize your sharebase feed
      </Text>
      <Box>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          mt="4em"
          gap="10"
        >
          {tags.map((tag: any) => (
            <GridItem key={tag.id}>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Flex alignItems={"center"}>
                  <Avatar size="lg" name={tag.title} src={tag.avatar} />
                  <Text ml="10px" fontWeight={"semibold"} fontSize={"lg"}>
                    # {tag.title}
                  </Text>
                </Flex>
                <Button
                  bg={"cyan.400"}
                  color={"white"}
                  _hover={{
                    bg: "cyan.500",
                  }}
                >
                  Follow
                </Button>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
