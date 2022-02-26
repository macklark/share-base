import {
  Stack,
  Box,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import React from "react";

type blogProps = {
  blogs: [
    {
      id: number;
      title: string;
      description: string;
    }
  ];
};

const Feed: React.FC<blogProps> = ({ blogs }) => {
  return (
    <Box width={{ base: "80%", md: "50%" }} mx={"auto"}>
      {blogs.map((blog) => {
        return (
          <Stack pb={{ base: 20, md: 10 }} key={blog.id}>
            <Heading marginTop="1">
              <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                {blog.title}
              </Link>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue("gray.700", "gray.200")}
              fontSize="lg"
            >
              {blog.description}
            </Text>
          </Stack>
        );
      })}
    </Box>
  );
};

export default Feed;
