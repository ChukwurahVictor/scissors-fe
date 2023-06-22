import { toast } from "react-toastify";

export const showToast = ({
  message,
  type,
}: {
  message: string;
  type: "error" | "success" | "warning" | "info" | "default" | "loading";
}) => {
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    type: type !== "loading" ? type : "default",
  });
};
