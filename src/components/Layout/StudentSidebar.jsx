import PersonIcon from "../Icons/PersonIcon";
import BookIcon from "../Icons/BookIcon";
import { useNavigate } from "react-router-dom";
import HelpIcon from "../Icons/HelpIcon";

export default function StudentSidebar({
  activeNav,
  color = "#5D9028",
  hoverColor = "#8eb169",
}) {
  const navigate = useNavigate();

  const navItems = [
    {
      id: "dashboard",
      icon: BookIcon,
      label: "დაშბორდი",
      action: () => navigate("/student-dashboard"),
    },
    {
      id: "profile",
      icon: PersonIcon,
      label: "პროფილი",
      action: () => navigate("/student-profile"),
    },
  ];
  return (
    <aside className=" hidden lg:flex w-60 bg-white flex flex-col  flex-shrink-0 overflow-y-auto rounded-xl m-4">
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <button
              key={item.id}
              onClick={item.action}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-left transition-all"
              style={{
                backgroundColor: isActive ? color : "transparent",
                color: isActive ? "#fff" : color,
              }}
            >
              <Icon color={isActive ? "#fff" : color} />

              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="m-3 mb-12 mt-auto bg-[#F4F6FA] rounded-xl p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <HelpIcon color="#5D9028" />

          <p className="text-md" style={{ color }}>
            დახმარება
          </p>
        </div>

        <p className="text-[11px] mb-3 leading-snug" style={{ color }}>
          დაგვიკავშირდით, თუ გჭირდებათ დახმარება
        </p>

        <div
          className="w-full text-white text-[11px] font-medium py-2 rounded-lg transition text-center"
          style={{ backgroundColor: color }}
        >
          032 222 51 07
        </div>
      </div>
    </aside>
  );
}
