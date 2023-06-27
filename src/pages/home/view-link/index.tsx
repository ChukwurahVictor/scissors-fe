import { Box, Divider, Flex, Text, Button, Image } from "@chakra-ui/react"
import CustomSpinner from "components/custom-spinner";
import TableStatus from "components/table-status";
import { Link, useParams, useNavigate } from "react-router-dom"
import { useFetchSingleUrl } from "services/swr/link"

const ViewLink = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isGenerating } = useFetchSingleUrl(id!);

  const goToHome = () => {
    navigate(-1);
  };

  if (isGenerating) {
    return <CustomSpinner />;
  }


  return (
    <Box maxW="5xl" mx="auto">
      <Button onClick={goToHome} ml={"-2"}>
        Back
      </Button>
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
          <Flex flex="1 1 0%" gap="2rem" alignItems="start">
            <Text fontWeight="medium" color="grey">
              QR Code
            </Text>
            <Image src={data?.qrcode.image} />
          </Flex>
        </Flex>
        <Divider />
        <Text fontSize={"lg"} fontWeight={"semibold"} mb="2.4rem" mt="5.25rem">
          Analytics
        </Text>
      </Box>
    </Box>
  );
}

export default ViewLink