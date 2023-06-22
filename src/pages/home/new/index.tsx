import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"

import useAxios from "hooks/use-axios";
import urls from "services/axios/urls";
import { showToast } from "utils/show-toast";
import CustomModal from "components/custom-modal";

interface Props {
  isOpen: boolean;
  close: (value: boolean) => void;
}

const NewLink = ({ isOpen, close }: Props) => {
  const navigate = useNavigate();
  const { loading, makeRequest } = useAxios();
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submit: SubmitHandler<any> = async data => {
    if (!data) return;
    console.log(data);

    const {
      // data: resData,
      status,
      error,
    } = await makeRequest({
      payload: data,
      method: "post",
      url: urls.createShortUrl,
    });

    if (status === "error") {
      return showToast({
        type: "error",
        message: String(error) || "An error occurred",
      });
    }

    showToast({
      type: "success",
      message: "Url created Successfully!",
    });

    mutate(`${urls.fetchUrls}`);

    navigate("/links");
  }

  return (
    <CustomModal
      closeIcon
      description={"SHORTEN YOUR URL!"}
      contentProps={{ justifyContent: "center" }}
      // closeIconClick={handleCloseModal}
      setModalOpen={close}
      modalOpen={isOpen}
      closeOnOverlayClick
    >
      <form onSubmit={handleSubmit(submit)}>
        <Flex flexDirection="column" gap="2.4rem" mt="40px">
          {/* <Text>Shorten your Url!</Text> */}
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input type="text" placeholder="title" {...register("title")} />
            <FormErrorMessage>
              {errors?.title && errors?.title.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">Custom name</FormLabel>
            <Input
              type="text"
              placeholder="custom name"
              {...register("customName")}
            />
            <FormErrorMessage>
              {errors?.customName && errors?.customName.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="longUrl">Long Url</FormLabel>
            <Input type="text" placeholder="Enter URL" {...register("longUrl")} />
            <FormErrorMessage>
              {errors?.longUrl && errors?.longUrl.message?.toString()}
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
        </Flex>
      </form>
    </CustomModal>
  );
}

export default NewLink