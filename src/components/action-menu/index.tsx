import { ReactComponent as EyeIcon } from "../../assets/icons/eye.svg";
import { ReactComponent as EditIcon } from "assets/icons/pencil-edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/trash-2.svg";
import {
  Button,
  ButtonGroup,
  Flex,
  // Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
} from "@chakra-ui/react";

export enum Actions {
  View = "View",
  Edit = "Edit",
  Archive = "Archive",
  Delete = "Delete",
  Reminder = "Set Reminder",
  Clone = "Clone",
  Cancel = "Cancel",
  Dispatch = "Dispatch",
  Order = "Order",
  Collect = "Collect",
  Assign = "Assign",
  Request = "Request Service",
}

export interface ActionType {
  label: `${Actions}`;
  cta?: () => void;
  status?: boolean;
  loading?: boolean;
  allowPopover?: boolean;
  confirmationText?: string;
  isDraft?: boolean;
  disabled?: boolean;
}

interface ActionsPropsType {
  actions: ActionType[];
}

const renderIcon = ({
  label,
  // status,
  cta,
  loading,
  allowPopover,
  confirmationText,
  isDraft,
  disabled,
}: ActionType) => {
  if (label === Actions.View) {
    return (
      <EyeIcon
        aria-disabled={loading}
        key={label}
        onClick={!loading ? cta : undefined}
        cursor={loading ? "not-allowed" : "pointer"}
        style={{ opacity: loading ? 0.5 : 1 }}
      />
    );
  }
  if (label === Actions.Edit) {
    return (
      <EditIcon
        key={label}
        onClick={!loading && !disabled ? cta : undefined}
        cursor={loading || disabled ? "not-allowed" : "pointer"}
        opacity={isDraft ? 0.4 : 1}
      />
    );
  }
  if (label === "Delete") {
    return allowPopover ? (
      <Popover>
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <DeleteIcon key={label} cursor={"pointer"} />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>{confirmationText}</PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <ButtonGroup size="md">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" isLoading={loading} onClick={cta}>
                    Okay
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </>
        )}
      </Popover>
    ) : (
      <DeleteIcon key={label} onClick={cta} cursor={"pointer"} />
    );
  }
};

const ActionMenu = ({ actions }: ActionsPropsType) => {
  return (
    <Flex align="center" justify="center" gap="1rem">
      {actions.map(action => (
        <Tooltip
          hasArrow
          isDisabled={action.loading}
          key={action.label}
          label={
            action.label === "Archive" && !action.status
              ? "Unarchive"
              : action.label
          }
          fontSize="1.2rem"
        >
          {renderIcon({
            ...action,
          })}
        </Tooltip>
      ))}
    </Flex>
  );
};

export default ActionMenu;
