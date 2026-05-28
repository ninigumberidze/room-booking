import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

// import ProjectLogo from "../components/Icons/ProjectLogo";
// import MailIcon from "../components/Icons/MailIcon";
// import PhoneIcon from "../components/Icons/PhoneIcon";
import HistoryIcon from "../components/Icons/HistoryIcon";
// import FemaleIcon from "../components/Icons/FemaleIcon";
// import MaleIcon from "../components/Icons/MaleIcon";
import Header from "../shared/components/Header";
import LogoutModal from "../shared/components/LogoutModal";
// import Pagination from "../shared/components/Pagination";
import QRModal from "../shared/components/QRModal";
import ProfileInfoCard from "../shared/components/ProfileInfoCard";
import ContactCard from "../shared/components/ContactCard";
import BookingHistoryTable from "../shared/components/BookingHistoryTable";
const mockLecturer = {
  firstName: "ნინი",
  lastName: "ლექტორაძე",
  birthDate: "31/05/2004",
  status: "ლექტორი",
  faculty: "IT",
  department: "Frontend Development",
  email: "lecturer@tsu.ge",
  phone: "+995 555123456",
  gender: "female",
};

const mockReservations = [
  {
    id: "RS00001",
    room: "XI კორპუსი - 323 ოთახი",
    type: "სემესტრული",
    date: "01/09/2026",
    active: true,
  },
  {
    id: "RS00002",
    room: "V კორპუსი - 210 ოთახი",
    type: "ერთჯერადი",
    date: "10/09/2026",
    active: true,
  },
  {
    id: "RS00003",
    room: "II კორპუსი - 101 ოთახი",
    type: "სემესტრული",
    date: "12/02/2026",
    active: false,
  },
  {
    id: "RS00004",
    room: "III კორპუსი - 201 ოთახი",
    type: "ერთჯერადი",
    date: "15/02/2026",
    active: false,
  },
  {
    id: "RS00005",
    room: "IX კორპუსი - 410 ოთახი",
    type: "სემესტრული",
    date: "20/02/2026",
    active: true,
  },
  {
    id: "RS00006",
    room: "IV კორპუსი - 120 ოთახი",
    type: "ერთჯერადი",
    date: "21/02/2026",
    active: false,
  },
  {
    id: "RS00007",
    room: "I კორპუსი - 501 ოთახი",
    type: "სემესტრული",
    date: "25/02/2026",
    active: true,
  },
];

export default function LecturerProfile() {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const [showHistory, setShowHistory] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [selectedReservation, setSelectedReservation] = useState(null);

  const [historyPage, setHistoryPage] = useState(1);

  const reservationsPerPage = 6;

  const totalHistoryPages = Math.ceil(
    mockReservations.length / reservationsPerPage,
  );

  const historyStartIndex = (historyPage - 1) * reservationsPerPage;

  const currentReservations = mockReservations.slice(
    historyStartIndex,
    historyStartIndex + reservationsPerPage,
  );

  return (
    <div className="min-h-screen">
      <Header
        userName={`${mockLecturer.firstName} ${mockLecturer.lastName}`}
        onProfileClick={() => navigate("/lecturer-dashboard")}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      <div className="max-w-6xl mx-auto p-8">
        {/* <div className="flex gap-8 mb-6">
          <div className="border-2 border-[#1A71B7] rounded-lg p-4 pl-12 pr-12 bg-white flex items-center justify-center">
            {mockLecturer.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
          </div>

          <div className="text-left border-2 border-[#1A71B7] rounded-lg bg-white flex-1 p-6">
            <div className="space-y-4 text-lg">
              <p>
                <span className="font-bold">სახელი:</span>{" "}
                {mockLecturer.firstName}
              </p>

              <p>
                <span className="font-bold">გვარი:</span>{" "}
                {mockLecturer.lastName}
              </p>

              <p>
                <span className="font-bold">დაბადების თარიღი:</span>{" "}
                {mockLecturer.birthDate}
              </p>

              <p>
                <span className="font-bold">სტატუსი:</span>{" "}
                {mockLecturer.status}
              </p>

              <p>
                <span className="font-bold">ფაკულტეტი:</span>{" "}
                {mockLecturer.faculty}
              </p>

              <p>
                <span className="font-bold">დეპარტამენტი:</span>{" "}
                {mockLecturer.department}
              </p>
            </div>
          </div>
        </div> */}

        <ProfileInfoCard
          firstName={mockLecturer.firstName}
          lastName={mockLecturer.lastName}
          birthDate={mockLecturer.birthDate}
          status={mockLecturer.status}
          gender={mockLecturer.gender}
          extraFields={[
            {
              label: "ფაკულტეტი",
              value: mockLecturer.faculty,
            },
            {
              label: "დეპარტამენტი",
              value: mockLecturer.department,
            },
          ]}
        />

        {/* <div className="border-2 border-[#1A71B7] rounded-lg bg-white p-6 mb-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-left font-semibold text-[#1A71B7] mb-3">
                ელექტრონული ფოსტა
              </h3>

              <div className="border-2 border-[#1A71B7] rounded px-4 py-2 flex items-center gap-2">
                <MailIcon />

                <span>{mockLecturer.email}</span>
              </div>
            </div>

            <div>
              <h3 className="text-left font-semibold text-[#1A71B7] mb-3">
                ტელეფონის ნომერი
              </h3>

              <div className="border-2 border-[#1A71B7] rounded px-4 py-2 flex items-center gap-2">
                <PhoneIcon />

                <span>{mockLecturer.phone}</span>
              </div>
            </div>
          </div>
        </div> */}
        <ContactCard email={mockLecturer.email} phone={mockLecturer.phone} />

        <div className="border-2 border-[#1A71B7] rounded-lg bg-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#1A71B7] font-medium">
            <HistoryIcon />

            <span>ჯავშნების ისტორია</span>
          </div>

          <button
            onClick={() => {
              setHistoryPage(1);
              setShowHistory(true);
            }}
            className="border-2 border-[#1A71B7] text-[#1A71B7] px-5 py-2 rounded hover:bg-[#1A71B7] hover:text-white transition"
          >
            სრულად ნახვა
          </button>
        </div>
      </div>

      {showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg w-[950px] overflow-hidden">
            <div className="bg-[#1A71B7] text-white px-6 py-4 flex justify-between items-center">
              <div className="flex gap-2 items-center justify-center">
                <HistoryIcon className="fill-white" />

                <h2 className="text-xl text-white font-semibold">
                  ჯავშნების ისტორია
                </h2>
              </div>

              <button
                onClick={() => {
                  setShowHistory(false);

                  setHistoryPage(1);
                }}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            {/* <div className="p-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left">ჯავშნის კოდი</th>

                    <th className="p-3 text-left">ჯავშნის თარიღი</th>

                    <th className="p-3 text-left">ჯავშნის ადგილი</th>

                    <th className="p-3 text-left">ტიპი</th>

                    <th className="p-3 text-left">QR კოდი</th>
                  </tr>
                </thead>

                <tbody>
                  {currentReservations.map((reservation) => (
                    <tr
                      key={reservation.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3">{reservation.id}</td>

                      <td className="p-3">{reservation.date}</td>

                      <td className="p-3">{reservation.room}</td>

                      <td className="p-3">{reservation.type}</td>

                      <td className="p-3">
                        <button
                          disabled={!reservation.active}
                          onClick={() => setSelectedReservation(reservation)}
                          className={`px-10 py-1 rounded text-white ${
                            reservation.active
                              ? "bg-[#1A71B7] hover:bg-[#1A71B7]/80 transition"
                              : "bg-gray-300 cursor-not-allowed"
                          }`}
                        >
                          QR კოდი
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                currentPage={historyPage}
                totalPages={totalHistoryPages}
                setCurrentPage={setHistoryPage}
              />
            </div> */}
            <BookingHistoryTable
              bookings={currentReservations}
              currentPage={historyPage}
              totalPages={totalHistoryPages}
              setCurrentPage={setHistoryPage}
              onSelectBooking={setSelectedReservation}
              showType={true}
            />
          </div>
        </div>
      )}

      <QRModal
        open={selectedReservation}
        onClose={() => setSelectedReservation(null)}
        qrValue={selectedReservation?.id}
      />

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
