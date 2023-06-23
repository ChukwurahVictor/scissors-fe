import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signupSchema } from "schema";
import { SignupResponseType } from "types";
import useAxios from "hooks/use-axios";
import { showToast } from "utils/show-toast";
import urls from "services/axios/urls";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const navigate = useNavigate();
  const { loading, makeRequest } = useAxios<SignupResponseType>();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit: SubmitHandler<any> = async data => {
    console.log(data);
    if (!data) return;
    const {
      data: resData,
      status,
      error,
    } = await makeRequest({
      payload: data,
      method: "post",
      url: urls.signupUrl,
    });

    if (status === "error") {
      return showToast({
        type: "error",
        message: String(error) || "An error occurred signing up",
      });
    }

    showToast({
      type: "success",
      message: "Signup Successful!",
    });

    console.log(resData)

    navigate(`/confirm-email/${resData!.data.id}`);
  };

  return (
    <Flex justify="center" mt="5%">
      <Box
        w="md"
        alignItems="center"
        borderRadius="10px"
        p="35px 35px"
        shadow={"base"}
      >
        <Flex gap="3" justify="center" alignItems={"center"} mb="30px">
          <Text fontSize="30px" fontWeight="bold" align="center">
            Register
          </Text>
          <FontAwesomeIcon icon={faUserPlus} size="2xl" />
        </Flex>
        <form onSubmit={handleSubmit(submit)}>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              type="text"
              placeholder="username"
              {...register("userName")}
            />
            <FormErrorMessage>
              {errors?.username && errors?.username.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              placeholder="johndoe@mail.com"
              {...register("email")}
            />
            <FormErrorMessage>
              {errors?.email && errors?.email.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt="10px">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="password"
              {...register("password")}
            />
            <FormErrorMessage>
              {errors?.password && errors?.password.message?.toString()}
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
        </form>
      </Box>
    </Flex>
  );
};

export default Signup;
