import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signinSchema } from "schema";
import { LoginResponseType } from "types";
import {
  // SigninPayloadType,
  loginDispatch,
} from "redux/slices/auth";
import useAxios from "hooks/use-axios";
import { showToast } from "utils/show-toast";
import { useAppDispatch } from "redux/hooks";
import urls from "services/axios/urls";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";;
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  // FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, makeRequest } = useAxios<LoginResponseType>();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit: SubmitHandler<any> = async data => {
    if (!data) return;
    const {
      data: resData,
      status,
      error,
    } = await makeRequest({
      payload: data,
      method: "post",
      url: urls.loginUrl,
    });

    if (status === "error") {
      return showToast({
        type: "error",
        message: String(error) || "An error occurred logging in",
      });
    }

    showToast({
      type: "success",
      message: "Login Successful!",
    });

    sessionStorage.setItem("auth-token", resData!.data.access_token);
    dispatch(loginDispatch(resData!.data.user));

    navigate("/links");
  };

  return (
    <Flex justify="center" mt="7%" px="30px">
      <Box
        w="md"
        alignItems="center"
        // border="1px solid gray"
        borderRadius="10px"
        p="35px 35px"
        shadow={"base"}
      >
        <Flex gap="2" justify="center" alignItems={"center"} mb="30px">
          <Text fontSize="30px" fontWeight="bold" pb="10px">
            Login
          </Text>
          <FontAwesomeIcon icon={faRightToBracket} size="2xl" />
        </Flex>
        <form onSubmit={handleSubmit(submit)}>
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

export default Login;
