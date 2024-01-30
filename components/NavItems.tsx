import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";

export const NavItem = (props: any) => {
  const { icon, children, ...rest } = props;
  return (
    <Flex
      align="center"
      px="4"
      pl="4"
      py="3"
      cursor="pointer"
      color={useColorModeValue("inherit", "gray.400")}
      _hover={{
        bg: "dark.100",
        color: useColorModeValue("light.100", "gray.200"),
      }}
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      {...rest}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: "191A22",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};
