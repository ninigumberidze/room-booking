import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import ProjectLogo from "../components/Icons/ProjectLogo";
// import FemaleIcon from "../components/Icons/FemaleIcon";
// import MaleIcon from "../components/Icons/MaleIcon";
// import MailIcon from "../components/Icons/MailIcon";
// import PhoneIcon from "../components/Icons/PhoneIcon";
import Header from "../shared/components/Header";
import LogoutModal from "../shared/components/LogoutModal";
import useAuthStore from "../store/authStore";
import ProfileInfoCard from "../shared/components/ProfileInfoCard";
import ContactCard from "../shared/components/ContactCard";

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
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className="min-h-screen ">
      <Header
        userName={mockAdmin.firstName + " " + mockAdmin.lastName}
        onProfileClick={() => navigate("/admin-dashboard")}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      <div className="max-w-6xl mx-auto p-8">
        {/* <div className="flex gap-8 mb-6">
          <div className="border-2 border-[#1A71B7] rounded-lg p-10 bg-white  flex items-center justify-center">
            {mockAdmin.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
          </div>

          <div className="text-left border-2 border-[#1A71B7] rounded-lg bg-white flex-1 p-6">
            <div className="space-y-4 text-lg">
              <p>
                <span className="font-bold">სახელი:</span> {mockAdmin.firstName}
              </p>

              <p>
                <span className="font-bold">გვარი:</span> {mockAdmin.lastName}
              </p>

              <p>
                <span className="font-bold">დაბადების თარიღი:</span>{" "}
                {mockAdmin.birthDate}
              </p>

              <p>
                <span className="font-bold">სტატუსი:</span> {mockAdmin.status}
              </p>
            </div>
          </div>
        </div> */}

        <ProfileInfoCard
          firstName={mockAdmin.firstName}
          lastName={mockAdmin.lastName}
          birthDate={mockAdmin.birthDate}
          status={mockAdmin.status}
          gender={mockAdmin.gender}
        />

        {/* <div className="border-2 border-[#1A71B7] rounded-lg bg-white p-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-left font-semibold text-[#1A71B7] mb-3">
                ელექტრონული ფოსტა
              </h3>

              <div className="border-2 border-[#1A71B7] rounded px-4 py-2 flex items-center gap-2">
                <MailIcon />

                <span>{mockAdmin.email}</span>
              </div>
            </div>

            <div>
              <h3 className="text-left font-semibold text-[#1A71B7] mb-3">
                ტელეფონის ნომერი
              </h3>

              <div className="border-2 border-[#1A71B7] rounded px-4 py-2 flex items-center gap-2">
                <PhoneIcon />

                <span>{mockAdmin.phone}</span>
              </div>
            </div>
          </div>
        </div> */}
        <ContactCard email={mockAdmin.email} phone={mockAdmin.phone} />
      </div>

      <div className="border-t mt-6 p-4 text-center text-sm text-gray-500">
        © ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი
      </div>
      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          navigate("/");
        }}
      />
    </div>
  );
}
