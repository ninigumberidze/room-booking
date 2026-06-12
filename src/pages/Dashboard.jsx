import useAuthStore from "../store/authStore";
import StudentDashboard from "./StudentDashboard";
import LecturerDashboard from "./LecturerDashboard";
import AdminDashboard from "./AdminDashboard";
import { useUser, useLogout } from "../store/authStore";
export default function Dashboard() {
  // const user = useAuthStore((state) => state.user);
  const user = useUser();
  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(user);
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
