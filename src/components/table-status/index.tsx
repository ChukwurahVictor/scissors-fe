import { Flex, Text } from "@chakra-ui/react";

interface PropType {
  title: string;
  type: "red" | "green"
}

const peculiars = {
  green: {
    color: "#00A305",
    bgColor: "#C2FFC4",
  },
  red: {
    color: "#A93449",
    bgColor: "#F9B4A6",
  },
};

const TableStatus = ({ title, type }: PropType) => {
  const color = peculiars[type].color;
  const bgColor = peculiars[type].bgColor;

  return (
    <Flex
      minW="7rem"
      w="fit-content"
      align="center"
      justify="center"
      px="0.3rem"
      py="0.5rem"
      h="2.4rem"
      bgColor={bgColor}
      borderRadius="2.6rem"
    >
      <Text
        variant="small"
        fontWeight="bold"
        color={color}
        textTransform="capitalize"
      >
        {title}
      </Text>
    </Flex>
  );
};

export default TableStatus;
