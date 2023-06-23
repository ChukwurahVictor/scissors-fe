import { SubmitHandler, useForm } from "react-hook-form";
import { mutate } from "swr";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import useAxios from "hooks/use-axios";
import urls from "services/axios/urls";
import { showToast } from "utils/show-toast";
import CustomModal from "components/custom-modal";

interface Props {
  isOpen: boolean;
//   close: (value: boolean) => void;
  row: any;
  setLink: (value: any) => void;
  setOpenEditModal: (value: boolean) => void;
}

const EditLink = ({ isOpen, row, setLink, setOpenEditModal }: Props) => {
//   const navigate = useNavigate();
  const { loading, makeRequest } = useAxios();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({defaultValues: { title: row?.title, customName: row?.customName, longUrl: row?.longUrl }});

  const submit: SubmitHandler<any> = async data => {
    if (!data) return;
    console.log(data);

    const {
      // data: resData,
      status,
      error,
    } = await makeRequest({
      payload: data,
      method: "patch",
      url: urls.editShortUrl(row?.id),
    });

    if (status === "error") {
      return showToast({
        type: "error",
        message: String(error) || "An error occurred",
      });
    }

    showToast({
      type: "success",
      message: "Url edited Successfully!",
    });

    mutate(`${urls.fetchUrls}`);
    setOpenEditModal(false);

    // navigate("/links");
  };

  const handleCloseModal = () => {
    setLink(undefined);
    setOpenEditModal(false);
  }
  console.log(row);
  return (
    <CustomModal
      closeIcon
      contentProps={{ justifyContent: "center" }}
      description="EDIT LINK"
      closeIconClick={handleCloseModal}
      //   setModalOpen={() => null}
      modalOpen={isOpen}
      setModalOpen={setOpenEditModal}
      closeOnOverlayClick
    >
      <form onSubmit={handleSubmit(submit)}>
        <Flex flexDirection="column" gap="2.4rem" mt="40px">
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              type="text"
              placeholder="title"
              {...register("title")}
              defaultValue={row?.title}
            />
            <FormErrorMessage>
              {errors?.title && errors?.title.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">Custom name</FormLabel>
            <Input
              type="text"
              placeholder="custom name"
              defaultValue={row?.customName}
              key={row?.customName}
              {...register("customName")}
            />
            <FormErrorMessage>
              {errors?.customName && errors?.customName.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="longUrl">Long Url</FormLabel>
            <Input
              type="text"
              placeholder="Enter URL"
              defaultValue={row?.longUrl}
              {...register("longUrl")}
            />
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
};

export default EditLink;
