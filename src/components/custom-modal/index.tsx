import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalContentProps,
} from "@chakra-ui/react";

export interface ModalPropType {
  setModalOpen: (modalOpen: boolean) => void;
  modalOpen: boolean;
  children: JSX.Element | JSX.Element[];
  description?: string;
  closeIcon?: boolean;
  closeIconClick?: () => void;
  closeOnOverlayClick?: boolean;
  contentProps?: ModalContentProps;
}

const CustomModal = ({
  setModalOpen,
  modalOpen,
  children,
  closeIcon,
  closeIconClick,
  description,
  closeOnOverlayClick,
  contentProps,
}: ModalPropType) => {
  const closeModal = () => {
    closeIconClick && closeIconClick();
    setModalOpen?.(false);
  };
  return (
    <Modal
      isOpen={modalOpen}
      closeOnOverlayClick={closeOnOverlayClick || false}
      onClose={closeModal}
      onOverlayClick={closeModal}
    >
      <ModalOverlay />
      <ModalContent
        maxWidth={{ base: "80%", lg: "60%" }}
        height="85%"
        width="93%"
        position="relative"
        background={"#fff!important"}
        py={{ base: "1.2rem", md: "4.8rem" }}
        px={{ base: "1.2rem", md: "5.2rem" }}
        {...contentProps}
      >
        {closeIcon && (
          <ModalCloseButton
            width="1rem"
            height="1rem"
            position="absolute"
            top="2.4rem"
            right="2.4rem"
            outline="none"
            onClick={closeIconClick}
          />
        )}
        {description && (
          <Text fontWeight="bold" align="center" color="#414141" fontSize="2xl">
            {description}
          </Text>
        )}
        {children}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
