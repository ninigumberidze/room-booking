import ProjectLogo from "../../components/Icons/ProjectLogo";

export default function Header({
  userName,
  onProfileClick,
  onLogoutClick,
  color = "#1A71B7",
}) {
  return (
    <div
      className="text-white px-6 py-4 flex justify-between items-center"
      style={{ backgroundColor: color }}
    >
      <ProjectLogo />

      <div className="flex items-center gap-3">
        <button
          onClick={onProfileClick}
          className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
        >
          {userName}
        </button>

        <button
          onClick={onLogoutClick}
          className="bg-[#F37A21] px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          გასვლა
        </button>
      </div>
    </div>
  );
}
