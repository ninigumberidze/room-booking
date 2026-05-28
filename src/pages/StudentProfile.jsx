import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectLogo from "../components/Icons/ProjectLogo";
// import MailIcon from "../components/Icons/MailIcon";
// import PhoneIcon from "../components/Icons/PhoneIcon";
import HistoryIcon from "../components/Icons/HistoryIcon";
// import FemaleIcon from "../components/Icons/FemaleIcon";
// import MaleIcon from "../components/Icons/MaleIcon";
import Header from "../shared/components/Header";
import LogoutModal from "../shared/components/LogoutModal";
import useAuthStore from "../store/authStore";
// import Pagination from "../shared/components/Pagination";
import QRModal from "../shared/components/QRModal";
import ProfileInfoCard from "../shared/components/ProfileInfoCard";
import ContactCard from "../shared/components/ContactCard";
import BookingHistoryTable from "../shared/components/BookingHistoryTable";
//  MOCK
const mockStudent = {
  firstName: "ნინი",
  lastName: "გუმბერიძე",
  birthDate: "31/05/2004",
  status: "სტუდენტი",
  email: "test@ens.tsu.edu.ge",
  phone: "+995 555121212",
  gender: "female",
};

const mockBookings = [
  {
    id: "BK00001",
    date: "01/09/2026",
    room: "XI კორპუსი - 323 ოთახი",
    active: true,
  },
  {
    id: "BK00002",
    date: "05/08/2026",
    room: "X კორპუსი - 202 ოთახი",
    active: true,
  },
  {
    id: "BK00003",
    date: "12/11/2025",
    room: "XI კორპუსი - 323 ოთახი",
    active: false,
  },
  {
    id: "BK00004",
    date: "02/09/2025",
    room: "XI კორპუსი - 323 ოთახი",
    active: false,
  },
  {
    id: "BK00005",
    date: "03/09/2025",
    room: "V კორპუსი - 120 ოთახი",
    active: true,
  },
  {
    id: "BK00006",
    date: "04/09/2025",
    room: "III კორპუსი - 220 ოთახი",
    active: false,
  },
  {
    id: "BK00007",
    date: "05/09/2025",
    room: "IX კორპუსი - 410 ოთახი",
    active: false,
  },
  {
    id: "BK00008",
    date: "06/09/2025",
    room: "II კორპუსი - 101 ოთახი",
    active: true,
  },
];

export default function StudentProfile() {
  const navigate = useNavigate();

  const [showHistory, setShowHistory] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const logout = useAuthStore((state) => state.logout);
  const [historyPage, setHistoryPage] = useState(1);

  const bookingsPerPage = 6;

  const totalHistoryPages = Math.ceil(mockBookings.length / bookingsPerPage);

  const historyStartIndex = (historyPage - 1) * bookingsPerPage;
  // const [selectedRoom, setSelectedRoom] = useState(null);
  const currentBookings = mockBookings.slice(
    historyStartIndex,
    historyStartIndex + bookingsPerPage,
  );
  return (
    <div className="min-h-screen">
      <Header
        userName={mockStudent.firstName + " " + mockStudent.lastName}
        onProfileClick={() => navigate("/student-dashboard")}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      <div className="max-w-6xl mx-auto p-8">
        {/* <div className="flex gap-8 mb-6">
          <div className="border-2 border-[#1A71B7] rounded-lg p-4 pl-12 pr-12 bg-white  flex items-center justify-center">
            {mockStudent.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
          </div>

          <div className="text-left border-2 border-[#1A71B7] rounded-lg bg-white flex-1 p-6">
            <div className="space-y-4 text-lg">
              <p>
                <span className="font-bold">სახელი:</span>{" "}
                {mockStudent.firstName}
              </p>

              <p>
                <span className="font-bold">გვარი:</span> {mockStudent.lastName}
              </p>

              <p>
                <span className="font-bold">დაბადების თარიღი:</span>{" "}
                {mockStudent.birthDate}
              </p>

              <p>
                <span className="font-bold">სტატუსი:</span> {mockStudent.status}
              </p>
            </div>
          </div>
        </div> */}
        <ProfileInfoCard
          firstName={mockStudent.firstName}
          lastName={mockStudent.lastName}
          birthDate={mockStudent.birthDate}
          status={mockStudent.status}
          gender={mockStudent.gender}
        />

        {/* <div className="border-2   border-[#1A71B7]  rounded-lg bg-white p-6 mb-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-left font-semibold text-[#1A71B7] mb-3">
                ელექტრონული ფოსტა
              </h3>

              <div className="border-2 border-[#1A71B7] rounded px-4 py-2 flex items-center gap-2">
                <MailIcon />

                <span>{mockStudent.email}</span>
              </div>
            </div>

            <div>
              <h3 className="text-left font-semibold text-[#1A71B7] mb-3">
                ტელეფონის ნომერი
              </h3>

              <div className="border-2 border-[#1A71B7]  rounded px-4 py-2 flex items-center gap-2">
                <PhoneIcon />

                <span>{mockStudent.phone}</span>
              </div>
            </div>
          </div>
        </div> */}
        <ContactCard email={mockStudent.email} phone={mockStudent.phone} />

        <div className="border-2 border-[#1A71B7] rounded-lg bg-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#1A71B7] font-medium">
            <HistoryIcon />
            <span>ისტორია</span>
          </div>

          <button
            onClick={() => setShowHistory(true)}
            className="border-2 border-[#1A71B7] text-[#1A71B7] px-5 py-2 rounded hover:bg-[#1A71B7] hover:text-white transition"
          >
            სრულად ნახვა
          </button>
        </div>
      </div>

      {showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg w-[900px] overflow-hidden">
            <div className="bg-[#1A71B7] text-white px-6 py-4 flex justify-between items-center">
              <div className="flex gap-2 items-center justify-center ">
                <HistoryIcon className="fill-white" />
                <h2 className="text-xl text-white font-semibold">
                  ჩანაწერების ისტორია
                </h2>
              </div>
              <button
                onClick={() => setShowHistory(false)}
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

                    <th className="p-3 text-left"></th>
                  </tr>
                </thead>

                <tbody>
                  {currentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b">
                      <td className="p-3">{booking.id}</td>

                      <td className="p-3">{booking.date}</td>

                      <td className="p-3">{booking.room}</td>

                      <td className="p-3">
                        <button
                          disabled={!booking.active}
                          onClick={() => setSelectedBooking(booking)}
                          className={`px-10  py-2 rounded text-white ${
                            booking.active
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
              
            </div> */}

            <BookingHistoryTable
              bookings={currentBookings}
              currentPage={historyPage}
              totalPages={totalHistoryPages}
              setCurrentPage={setHistoryPage}
              onSelectBooking={setSelectedBooking}
            />
          </div>
        </div>
      )}

      {/*  QR */}
      <QRModal
        open={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        qrValue={selectedBooking?.id}
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
