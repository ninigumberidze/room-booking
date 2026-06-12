import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useEffect } from "react";
import { reservationService } from "../services/reservationService";
import Header from "../components/Layout/Header";
import LogoutModal from "../shared/components/LogoutModal";
import useAuthStore from "../store/authStore";
import ProfileInfoCard from "../features/user/ProfileInfoCard";
import ContactCard from "../features/user/ContactCard";
import ProfileHeader from "../components/Layout/ProfileHeader";
import Footer from "../components/Layout/Footer";
import { useUser, useLogout } from "../store/authStore";
const mockAdmin = {
  firstName: "ნინიკო",
  lastName: "ადმინიკო",
  birthDate: "01/01/2000",
  status: "სისტემის ადმინისტრატორი",
  email: "test@tsu.ge",
  phone: "+995 555121212",
  gender: "female",
};

export default function AdminProfile() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logout = useLogout();
  return (
    <div className="min-h-screen ">
      <ProfileHeader
        userName={`${mockAdmin.firstName} ${mockAdmin.lastName}`}
        onProfileClick={() => navigate("/admin-profile")}
        onLogoutClick={() => setShowLogoutModal(true)}
      ></ProfileHeader>

      <div className="max-w-6xl mx-auto p-8">
        <ProfileInfoCard
          firstName={mockAdmin.firstName}
          lastName={mockAdmin.lastName}
          birthDate={mockAdmin.birthDate}
          status={mockAdmin.status}
          gender={mockAdmin.gender}
        />

        <ContactCard email={mockAdmin.email} phone={mockAdmin.phone} />
      </div>

      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          navigate("/");
        }}
      />
      <Footer />
    </div>
  );
}
