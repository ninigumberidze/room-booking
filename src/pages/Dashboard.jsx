import { useAuthStore } from "../store/authStore";
import StudentDashboard from "./StudentDashboard";
import LecturerDashboard from "./LecturerDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  switch (user.role) {
    case "student":
      return <StudentDashboard />;

    case "lecturer":
      return <LecturerDashboard />;

    case "admin":
      return <AdminDashboard />;

    default:
      return <div>Unauthorized</div>;
  }
}