import { Flex, Text } from "@chakra-ui/react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface PropType {
  totalCount: number;
  handlePreviousLoad: () => void;
  handleNextLoad: () => void;
  nextLoad?: string;
  previous?: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const TablePagination = ({
  totalCount,
  handlePreviousLoad,
  handleNextLoad,
  previous,
  nextLoad,
  count,
  setCount,
}: PropType) => {
  return (
    <Flex fontWeight="300" my="1rem" align="center" justify="end" gap="1rem">
      <Text color="typography.neutral" fontSize={"1.2rem"}>
        {count + 1}-{count + 10 > totalCount ? totalCount : count + 10} of {totalCount}
      </Text>
      <Flex gap=".5rem">
        <Flex
          display="flex"
          h="2rem"
          w="2rem"
          alignItems="center"
          justifyContent="center"
          border="50%"
          outline="none"
          cursor={!previous ? "not-allowed" : "pointer"}
          onClick={() => {
            if (count < 1 || !previous) return;
            handlePreviousLoad();
            setCount(_count => _count - 10);
          }}
        >
          <IoChevronBack color={!previous ? "#9FA2B4" : "#6B7280"} />
        </Flex>
        <Flex
          display="flex"
          h="2rem"
          w="2rem"
          alignItems="center"
          justifyContent="center"
          border="50%"
          outline="none"
          cursor={!nextLoad ? "not-allowed" : "pointer"}
          onClick={() => {
            if (count + 10 > totalCount || !nextLoad) return;
            handleNextLoad();
            setCount(_count => _count + 10);
          }}
        >
          <IoChevronForward
            style={{ pointerEvents: !nextLoad ? "none" : "auto" }}
            color={!nextLoad ? "#9FA2B4" : "#6B7280"}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TablePagination;
