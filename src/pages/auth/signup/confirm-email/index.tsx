import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { mutate } from "swr";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

import useAxios from "hooks/use-axios";
import urls from "services/axios/urls";
import { showToast } from "utils/show-toast";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, makeRequest } = useAxios();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submit: SubmitHandler<any> = async data => {
    if (!data) return;

    const {
      status,
      error,
    } = await makeRequest({
      payload: data,
      method: "post",
      url: urls.verifyMailUrl(id!),
    });

    if (status === "error") {
      return showToast({
        type: "error",
        message: String(error) || "An error occurred",
      });
    }

    showToast({
      type: "success",
      message: "Email verified Successfully!",
    });

    mutate(`${urls.fetchUrls}`);

    navigate("/login");
  };

  const resendToken = async() => {
    const { status, error } = await makeRequest({
      method: "post",
      url: urls.resendToken(id!),
    });

    if (status === "error") {
      return showToast({
        type: "error",
        message: String(error) || "An error occurred",
      });
    }

    showToast({
      type: "success",
      message: "Token resent Successfully!",
    });
  }
  
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Flex
        flexDirection="column"
        gap="2.4rem"
        mt="40px"
        w="md"
        mx="auto"
        px="20px"
        alignItems={"center"}
      >
        <Text fontSize="2xl" fontWeight={"bold"}>
          Verify your Email!
        </Text>
        <Text>Enter the code sent to your email (Check your spam too)</Text>
        <FormControl>
          <FormLabel htmlFor="token">Verification Code</FormLabel>
          <Input type="text" placeholder="token" {...register("token")} />
          <FormErrorMessage>
            {errors?.token && errors?.token.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          w="full"
          bg="#1068AB"
          color="white"
          type="submit"
          isLoading={loading}
          disabled={loading}
        >
          Submit
        </Button>
        <Flex gap="2">
          <Text>Didn't receive any mail?</Text>
          <Text
            color="#1068AB"
            fontWeight={"semibold"}
            as="button"
            onClick={resendToken}
          >
            Resend
          </Text>
        </Flex>
      </Flex>
    </form>
  );
};

export default ConfirmEmail;
