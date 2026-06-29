import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectLogo from "../components/Icons/ProjectLogo";
import MailIcon from "../components/Icons/MailIcon";
import HistoryIcon from "../components/Icons/HistoryIcon";
import { useEffect } from "react";
import { reservationService } from "../services/reservationService";
import Header from "../components/Layout/Header";
import useAuthStore from "../store/authStore";
import ReservationCancelModal from "../features/user/ReservationCancelModal";
import QRModal from "../features/user/QRModal";
import ProfileInfoCard from "../features/user/ProfileInfoCard";
import ContactCard from "../features/user/ContactCard";
import BookingHistoryTable from "../features/user/BookingHistoryTable";
import ProfileHeader from "../components/Layout/ProfileHeader";
import Footer from "../components/Layout/Footer";
import { useLogout } from "../shared/hooks/useLogout";
import StudentSidebar from "../components/Layout/StudentSidebar";
export default function StudentProfile() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [historyPage, setHistoryPage] = useState(1);
  const user = useAuthStore((state) => state.user);
  const [selectedQR, setSelectedQR] = useState(null);
  const bookingsPerPage = 6;
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const totalHistoryPages = Math.ceil(bookings.length / bookingsPerPage);

  const handleCancelClick = (booking) => {
    setReservationToCancel(booking);
  };
  const historyStartIndex = (historyPage - 1) * bookingsPerPage;

  const currentBookings = bookings.slice(
    historyStartIndex,
    historyStartIndex + bookingsPerPage,
  );
  const handleConfirmCancel = async () => {
    try {
      console.log("CANCELLING:", reservationToCancel);

      const { data } = await reservationService.deleteReservation(
        reservationToCancel.id,
      );

      console.log("DELETE RESPONSE:", data);

      await loadReservations();

      setReservationToCancel(null);
    } catch (error) {
      console.error("CANCEL ERROR:", error);

      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
    }
  };
  useEffect(() => {
    loadReservations();
  }, []);
  const handleShowQR = (booking) => {
    console.log("QR:", booking.qrCodeBase64);
    setSelectedQR(booking.qrCodeBase64);
  };
  const loadReservations = async () => {
    try {
      const { data } = await reservationService.getMyReservations();

      console.log("MY RESERVATIONS:", data);

      setBookings(data.reservations);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("BOOKING:", bookings[0]);
  return (
    <div className="min-h-screen flex flex-col">
      <ProfileHeader
        userName={`${user?.firstName || ""} ${user?.lastName || ""}`}
        onProfileClick={() => navigate("/student-dashboard")}
        color="#5D9028"
      />
      <div className="flex flex-1 ">
        <StudentSidebar activeNav="profile" color="#5D9028" />
        <div className="flex-1 p-8">
          <ProfileInfoCard
            firstName={user?.firstName}
            lastName={user?.lastName}
            birthDate={user?.dateOfBirth}
            status={user?.userType}
            gender={user?.gender}
            color="#5D9028"
          />
          <ContactCard
            email={user?.email}
            phone={user?.phoneNumber}
            color="#5D9028"
          />
          <div className="border-2 border-[#5D9028] rounded-lg bg-white p-6 flex justify-between items-center">
            <div className="flex items-center gap-2 text-[#5D9028] font-medium">
              <HistoryIcon />
              <span>ისტორია</span>
            </div>

            <button
              onClick={() => setShowHistory(true)}
              className="border-2 border-[#5D9028] text-[#5D9028] px-5 py-2 rounded hover:bg-[#5D9028] hover:text-white transition"
            >
              სრულად ნახვა
            </button>
          </div>
        </div>

        {showHistory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg w-[1100px] overflow-hidden">
              <div className="bg-[#5D9028] text-white px-6 py-4 flex justify-between items-center">
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

              <BookingHistoryTable
                bookings={currentBookings}
                currentPage={historyPage}
                totalPages={totalHistoryPages}
                setCurrentPage={setHistoryPage}
                onSelectBooking={handleShowQR}
                onCancelBooking={handleCancelClick}
                color="#5D9028"
              />
            </div>
          </div>
        )}

        <QRModal
          open={!!selectedQR}
          onClose={() => setSelectedQR(null)}
          qrImage={selectedQR}
        />
        <ReservationCancelModal
          open={!!reservationToCancel}
          onClose={() => setReservationToCancel(null)}
          onConfirm={handleConfirmCancel}
        />
      </div>
      <Footer />
    </div>
  );
}
