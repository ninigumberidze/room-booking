import { useNavigate } from "react-router-dom";
import ProfileInfoCard from "../features/user/ProfileInfoCard";
import ContactCard from "../features/user/ContactCard";
import ProfileHeader from "../components/Layout/ProfileHeader";
import Footer from "../components/Layout/Footer";
import { useUser } from "../store/authStore";

export default function AdminProfile() {
  const navigate = useNavigate();
  const user = useUser();

  return (
    <div className="min-h-screen">
      <ProfileHeader
        userName={`${user?.firstName || ""} ${user?.lastName || ""}`}
        onProfileClick={() => navigate("/admin-dashboard")}
      />
      <div className="max-w-6xl mx-auto p-8">
        <ProfileInfoCard
          firstName={user?.firstName}
          lastName={user?.lastName}
          birthDate={user?.dateOfBirth}
          status={user?.userType}
          gender={user?.gender}
          color={"#5D9028"}
        />
        <ContactCard email={user?.email} phone={user?.phoneNumber} />
      </div>
      <Footer />
    </div>
  );
}
