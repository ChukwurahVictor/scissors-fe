import { Text, Box, Container, Button, Flex } from "@chakra-ui/react"
import { ReactComponent as Stroke } from "../../assets/icons/stroke.svg";

const LandingPage = () => {
  return (
    <Box mt="117px">
      <Text
        fontSize={{ base: "20px", lg: "48px" }}
        fontWeight="600"
        align="center"
      >
        Optimize Your Online Experience With Our
      </Text>
      <Flex
        fontSize={{ base: "20px", lg: "48px" }}
        fontWeight="600"
        justify={"center"}
        align="center"
        gap={"2"}
      >
        <Text>Advanced </Text>
        <Text color="#1068AB">URL Shortening</Text>
        <Text>Solution</Text>
      </Flex>
      <Flex justify={"center"}>
        <Stroke />
      </Flex>
      <Container maxW="781px" mt="20px">
        <Text align="center">
          Personalize your shortened URLs to align with your brand identity.
          Utilize custom slugs, branded links, and domain customization options
          to reinforce your brand presence and enhance user engagement.
        </Text>
      </Container>
      <Flex gap="8" alignItems="center" justify="center" mt="30px">
        <Button bg="#1068AB" color="white" borderRadius="20px" p="10px 15px">
          <Text>Register Now</Text>
        </Button>
        <Text color="#1068AB">Learn More</Text>
      </Flex>
    </Box>
  );
}

export default LandingPage