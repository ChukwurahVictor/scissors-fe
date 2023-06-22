import {
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { ReactComponent as Stop } from "assets/icons/stop.svg";
import { Button } from "@chakra-ui/react";

interface DeleteModalPropType {
  confirmationText: string;
  openDeleteModal: boolean;
  onDelete: (e?: any) => void;
  setCloseDeleteModal: (state: boolean) => void;
  loadingState?: boolean;
  deleteDetails?: {
    shouldDelete: boolean;
    reason: string;
  };
  setDeleteDetails?: React.Dispatch<
    React.SetStateAction<{
      shouldDelete: boolean;
      reason: "employee-tied" | "membership-tied" | "";
    }>
  >;
}

const ConfirmDeleteModal = ({
  confirmationText,
  onDelete,
  setCloseDeleteModal,
  openDeleteModal,
  loadingState,
  deleteDetails,
  setDeleteDetails,
}: DeleteModalPropType) => {
  const onClose = () => setCloseDeleteModal(!openDeleteModal);

  return (
    <Modal isOpen={openDeleteModal} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxWidth="50rem"
        width="100%"
        position="relative"
        px={{ base: "2rem", md: "6rem" }}
        pt={{ base: "2rem", md: "6rem" }}
        pb="10rem"
      >
        <ModalCloseButton
          width="0.8rem"
          height="0.8rem"
          position="absolute"
          top="2.4rem"
          right="2.4rem"
          outline="none"
        />
        <Flex flexDir="column" align="center" gap="5rem">
          <Stop />
          <Text color="#EB6969" fontWeight="700" textAlign={"center"}>
            {confirmationText}
          </Text>
          <Flex width="100%" flexDir="column" gap="1rem">
            {deleteDetails?.reason ? null : (
              <Button
                variant="danger"
                color="#fff"
                bg="#EB6969"
                style={{ borderRadius: ".8rem", width: "100%" }}
                onClick={onDelete}
                // loading={loadingState}
              >
                Yes
              </Button>
            )}
            <Button
              variant="danger-outline"
              style={{
                borderRadius: ".8rem",
                width: "100%",
                backgroundColor: "#fff",
              }}
              onClick={() => {
                setDeleteDetails &&
                  setDeleteDetails({
                    shouldDelete: false,
                    reason: "",
                  });
                setCloseDeleteModal(!openDeleteModal);
              }}
            >
              {deleteDetails?.reason ? "Close" : "No"}
            </Button>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;
