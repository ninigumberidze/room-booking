import ProjectLogo from "../Icons/ProjectLogo";
import { useLogout } from "../../shared/hooks/useLogout";
import LogoutModal from "../../shared/components/LogoutModal";
import ExitIcon from "../Icons/ExitIcon";
import PersonIcon from "../Icons/PersonIcon";

export default function Header({
  userName,
  onProfileClick,
  color = "#1A71B7",
}) {
  const logoutModal = useLogout();

  return (
    <>
      <div
        className="text-white px-6 py-4 flex justify-between items-center"
        style={{ backgroundColor: color }}
      >
        <div className="flex items-center gap-2">
          <ProjectLogo />
          <div className="flex flex-col">
            <span className="font-bold text-left text-lg leading-tight">
              UniRoom
            </span>
            <span className="text-sm leading-tight">მართვის სისტემა</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onProfileClick}
            className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
          >
            {userName}
          </button>

          <button
            onClick={logoutModal.open}
            className=" px-4 py-2 rounded-lg hover:bg-red-600 transition border border-white text-white hover:text-white"
          >
            <ExitIcon className="w-5 h-4" color="white" />
          </button>
        </div>
      </div>
      <LogoutModal
        open={logoutModal.isOpen}
        onClose={logoutModal.close}
        onConfirm={logoutModal.confirmLogout}
      />
    </>
  );
}
