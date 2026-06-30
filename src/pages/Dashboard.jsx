import useAuthStore from "../store/authStore";
import StudentDashboard from "./StudentDashboard";
import LecturerDashboard from "./LecturerDashboard";
import AdminDashboard from "./AdminDashboard";
import { useUser } from "../store/authStore";
import { useLogout } from "../shared/hooks/useLogout";
export default function Dashboard() {
  const user = useUser();
  if (!user) {
    return <div>იტვირთება...</div>;
  }
  
  switch (user.userType) {
    case "Student":
      return <StudentDashboard />;

    case "Lecturer":
      return <LecturerDashboard />;

    case "Admin":
      return <AdminDashboard />;

    default:
      return <div>Unauthorized</div>;
  }
}
