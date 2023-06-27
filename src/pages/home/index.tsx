import { useState } from "react";
import { Button, Container, Flex, Text, Input, Box, Link } from "@chakra-ui/react";
import TableStatus from "components/table-status";
import moment from "moment";
import DataTable, { TableColumn } from "react-data-table-component";
import { mutate } from "swr";


import ActionMenu from "components/action-menu";
import CustomSpinner from "components/custom-spinner";
import { useFetchUrls } from "services/swr/link";
import { UrlType } from "types";
import { useNavigate } from "react-router-dom";
import useAxios from "hooks/use-axios";
import urls from "services/axios/urls";
import { showToast } from "utils/show-toast";

import EditLink from "./edit-link";
import NewLink from "./new";

const Home = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [link, setLink] = useState<UrlType>();

  const navigate = useNavigate();
  const { makeRequest } = useAxios();

  const { data, isGenerating } = useFetchUrls();

  const handleDelete = async(id: string) => {
    if (!data) return;

    const {
      status,
      error,
    } = await makeRequest({
      payload: data,
      method: "delete",
      url: urls.deleteUrl(id),
    });

    if (status === "error") {
      return showToast({
        type: "error",
        message: String(error) || "An error occurred deleting url",
      });
    }

    showToast({
      type: "success",
      message: "Url deleted Successfully!",
    });

    mutate(`${urls.fetchUrls}`);
  };

  const columns: TableColumn<UrlType>[] = [
    {
      name: "Title",
      selector: row => row.title,
    },
    {
      name: "Short Link",
      cell: row => (
        <Link href={`https://shortify-rg0z.onrender.com/${row.shortUrl}`}>
          {`shortify/${row.shortUrl}`}
        </Link>
      ),
    },
    {
      name: "Original Link",
      selector: row => row.longUrl,
    },
    {
      name: (
        <Flex w="100px" justify={"center"}>
          Date
        </Flex>
      ),
      cell: row => (
        <Flex w="100px" justify={"center"}>
          <Text fontWeight="semiBold">
            {moment(row.updatedAt).format("DD/MM/YYYY")}
          </Text>
        </Flex>
      ),
    },
    {
      name: (
        <Flex w="100px" justify={"center"}>
          Status
        </Flex>
      ),
      minWidth: "fit-content",
      cell: row => {
        return (
          <Flex w="100px" justify={"center"}>
            <TableStatus
              title={row.isActive === true ? "Active" : "Inactive"}
              type={row.isActive === true ? "green" : "red"}
            />
          </Flex>
        );
      },
    },
    {
      name: "Actions",
      cell: row => (
        <ActionMenu
          actions={[
            {
              label: "View",
              cta: () => {
                navigate(`/links/${row.id}`);
              },
            },
            {
              label: "Edit",
              cta: () => {
                setLink(row);
                setOpenEditModal(true);
              },
            },
            {
              label: "Delete",
              cta: () => {
                handleDelete(row.id);
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <Container maxW="7xl" mx="auto" mt="75px">
      <Flex justify="end">
        <Button
          bg="#1068AB"
          color="white"
          borderRadius="20px"
          p="10px 15px"
          onClick={() => setOpenAddModal(true)}
        >
          <Text>Create New</Text>
        </Button>
      </Flex>
      <Flex justify="start" mt="20px">
        <Input placeholder="search" w="20rem" h="3rem" borderRadius="10px" />
      </Flex>
      <Box mt="60px">
        {data && data.length > 0 ? <DataTable
          data={data}
          columns={columns}
          pagination={true}
          progressComponent={<CustomSpinner />}
          progressPending={isGenerating}
        /> : <CustomSpinner />
        }
      </Box>
      <NewLink
        isOpen={openAddModal}
        close={setOpenAddModal}
        setOpenAddModal={setOpenAddModal}
      ></NewLink>
      <EditLink
        isOpen={openEditModal}
        row={link}
        setLink={setLink}
        setOpenEditModal={setOpenEditModal}
      ></EditLink>
    </Container>
  );
}
  
  export default Home
  