import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Link,
  BoxProps,
  FlexProps,
  Icon,
  Button,
} from "@chakra-ui/react";
import { ReactText } from "react";
import { IconType } from "react-icons";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineTag } from "react-icons/ai";
import { useAuth } from "../utils/authContext";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface NavButtonProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactText;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", href: "/", icon: BiHomeAlt },
  { name: "Tags", href: "/tags", icon: AiOutlineTag },
];

const NavButtons = ({ icon, children, href, ...rest }: NavButtonProps) => {
  return (
    <Link
      href={href}
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

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { isUserAuthenticated } = useAuth();

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
      <Flex justifyContent={"center"} mb="30px">
        {isUserAuthenticated === "authenticated" && (
          <Link _hover={{ textDecoration: "none" }} href="/new">
            <Button
              width={"100%"}
              bgColor={"cyan.500"}
              color={"white"}
              _hover={{ color: "cyan.500", bgColor: "white" }}
            >
              WRITE
            </Button>
          </Link>
        )}
      </Flex>
      {LinkItems.map((link) => (
        <NavButtons key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavButtons>
      ))}
    </Box>
  );
};

export default SidebarContent;
