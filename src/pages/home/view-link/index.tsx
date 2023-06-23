import { Box, Divider, Flex, Text } from "@chakra-ui/react"
import CustomSpinner from "components/custom-spinner";
import TableStatus from "components/table-status";
import { Link, useParams } from "react-router-dom"
import { useFetchSingleUrl } from "services/swr/link"

const ViewLink = () => {
  const { id } = useParams();
  const { data, isGenerating } = useFetchSingleUrl(id!);

  return (
    <Box maxW="4xl" mx="auto">
      {isGenerating ? (
        <Flex justify={"center"} alignItems={"center"}>
          <CustomSpinner />
        </Flex>
      ) : (
        <Box py="2rem" px="4rem" borderRadius="0.8rem" bg="#fff">
          <Text fontSize={"3xl"} fontWeight={"bold"} mb="2.4rem">
            {data?.title}
          </Text>
          <Flex
            gap="3rem"
            flexDir={{ base: "column", md: "row" }}
            justify="space-between"
            align="start"
            mb="4.8rem"
            mt="6.7rem"
          >
            <Flex flex="1 1 0%" gap="1rem" alignItems="center">
              <Text fontWeight="medium" color="grey">
                Custom Name
              </Text>
              <Text>{data?.customName}</Text>
            </Flex>
            <Flex flex="1 1 0%" gap="1rem" alignItems="center">
              <Text fontWeight="medium" color="grey">
                Status
              </Text>
              <TableStatus
                title={data?.isActive === true ? "Active" : "Inactive"}
                type={data?.isActive === true ? "green" : "red"}
              />
            </Flex>
          </Flex>
          <Flex
            gap="3rem"
            flexDir={{ base: "column", md: "row" }}
            justify="space-between"
            align="start"
            mb="4.8rem"
            mt="6.7rem"
          >
            <Flex flex="1 1 0%" gap="2rem" alignItems="center">
              <Text fontWeight="medium" color="grey">
                Long Url
              </Text>
              <Text>{data?.longUrl}</Text>
            </Flex>
          </Flex>
          <Flex
            gap="3rem"
            flexDir={{ base: "column", md: "row" }}
            justify="space-between"
            align="start"
            mb="4.8rem"
            mt="6.7rem"
          >
            <Flex flex="1 1 0%" gap="2rem" alignItems="center">
              <Text fontWeight="medium" color="grey">
                Shortened Link
              </Text>
              <Link to={`https://shortify-rg0z.onrender.com/${data?.shortUrl}`}>
                <Text>{`shortify/${data?.shortUrl}`}</Text>
              </Link>
            </Flex>
            <Flex flex="1 1 0%" gap="2rem" alignItems="center"></Flex>
          </Flex>
          <Divider />
          <Text
            fontSize={"lg"}
            fontWeight={"semibold"}
            mb="2.4rem"
            mt="5.25rem"
          >
            Analytics
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default ViewLink