import { useNavigate, useLocation } from "react-router-dom";

export default function StudentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      label: "დეშბორდი",
      icon: "🏠",
      path: "/student-dashboard",
    },
    {
      label: "პროფილი",
      icon: "👤",
      path: "/student-profile",
    },
  ];

  return (
    <div className="w-64 bg-white border-r shadow-sm min-h-screen p-5">
      <h2 className="text-2xl font-bold text-[#1A71B7] mb-10">TSU Rooms</h2>

      <div className="space-y-2">
        {menu.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
              location.pathname === item.path
                ? "bg-[#1A71B7] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
