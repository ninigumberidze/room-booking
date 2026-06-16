import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { useDisclosure } from "./useDisclosure";

export function useLogout() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const modal = useDisclosure();

  const confirmLogout = () => {
    logout();
    navigate("/");
  };

  return {
    isOpen: modal.isOpen,
    open: modal.open,
    close: modal.close,
    confirmLogout,
  };
}
