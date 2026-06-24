import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import HistoryIcon from "../components/Icons/HistoryIcon";
import Header from "../components/Layout/Header";
import QRModal from "../features/user/QRModal";
import ProfileInfoCard from "../features/user/ProfileInfoCard";
import ContactCard from "../features/user/ContactCard";
import BookingHistoryTable from "../features/user/BookingHistoryTable";
import ProfileHeader from "../components/Layout/ProfileHeader";
import ReservationCancelModal from "../features/user/ReservationCancelModal";
import { reservationService } from "../services/reservationService";
import Footer from "../components/Layout/Footer";
import { useUser } from "../store/authStore";
import { useLogout } from "../shared/hooks/useLogout";
import LecturerSidebar from "../components/Layout/LecturerSidebar";
export default function LecturerProfile() {
  const navigate = useNavigate();
  const user = useUser();

  const [bookings, setBookings] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [historyPage, setHistoryPage] = useState(1);

  const bookingsPerPage = 5;
  const totalHistoryPages = Math.ceil(bookings.length / bookingsPerPage);
  const currentBookings = bookings.slice(
    (historyPage - 1) * bookingsPerPage,
    historyPage * bookingsPerPage,
  );

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      const { data } = await reservationService.getMyReservations();
      setBookings(data.reservations || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowQR = (booking) => {
    setSelectedQR(booking.qrCodeBase64);
  };

  const handleCancelClick = (booking) => {
    setReservationToCancel(booking);
  };

  const handleConfirmCancel = async () => {
    try {
      await reservationService.deleteReservation(reservationToCancel.id);
      await loadReservations();
      setReservationToCancel(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ProfileHeader
        userName={`${user?.firstName || ""} ${user?.lastName || ""}`}
        onProfileClick={() => navigate("/lecturer-dashboard")}
      />
      <div className="flex flex-1 ">
        <LecturerSidebar activeNav="profile" />
        <div className="flex-1 p-8">
          <ProfileInfoCard
            firstName={user?.firstName}
            lastName={user?.lastName}
            birthDate={user?.dateOfBirth}
            status={user?.userType}
            gender={user?.gender}
          />

          <ContactCard email={user?.email} phone={user?.phoneNumber} />

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
            <div className="bg-white rounded-lg w-[1100px] overflow-hidden">
              <div className="bg-[#1A71B7] text-white px-6 py-4 flex justify-between items-center">
                <div className="flex gap-2 items-center">
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

              <BookingHistoryTable
                bookings={currentBookings}
                currentPage={historyPage}
                totalPages={totalHistoryPages}
                setCurrentPage={setHistoryPage}
                onSelectBooking={handleShowQR}
                onCancelBooking={handleCancelClick}
                showType={true}
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
