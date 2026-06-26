import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { reservationService } from "../services/reservationService";
import BookingConfirmModal from "../features/booking/BookingConfirmModal";
import SuccessQRModal from "../features/booking/SuccessQRModal";
import TimeSlotModal from "../features/booking/TimeSlotModal";
import { useUser } from "../store/authStore";
import Header from "../components/Layout/Header";
import SearchIcon from "../components/Icons/SearchIcon";
import DeleteIcon from "../components/Icons/DeleteIcon";
import Pagination from "../shared/components/Pagination";
import RoomCard from "../features/booking/RoomCard";
import StudentSidebar from "../components/Layout/StudentSidebar";
import Footer from "../components/Layout/Footer";

export default function StudentDashboard() {
  const user = useUser();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    date: "",
    buildingId: "",
    roomType: "",
    roomNumber: "",
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [reservationTitle, setReservationTitle] = useState("");
  const [selectedRoomForTime, setSelectedRoomForTime] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [results, setResults] = useState([]);
  const [confirmRoom, setConfirmRoom] = useState(null);
  const [bookingError, setBookingError] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationResult, setReservationResult] = useState(null);
  const [reservationFilters, setReservationFilters] = useState(null);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [availability, setAvailability] = useState(null);
  const roomsPerPage = 6;
  const totalPages = Math.ceil(results.length / roomsPerPage);
  const startIndex = (currentPage - 1) * roomsPerPage;
  const currentRooms = results.slice(startIndex, startIndex + roomsPerPage);

  useEffect(() => {
    loadFilters();
  }, []);

  const handleOpenTimeSlots = async (room) => {
    if (!room.hasAvailability) return;
    try {
      const { data } = await reservationService.getAvailability(
        room.id,
        filters.date,
      );
      setAvailability(data);
      setSelectedRoomForTime(room);
      setSelectedSlots([]);
    } catch (error) {
      console.log(error);
    }
  };

  const loadRooms = async (searchFilters = {}) => {
    try {
      const params = {
        date: searchFilters.date,
        buildingId: Number(searchFilters.buildingId),
        roomType: Number(searchFilters.roomType),
      };
      if (searchFilters.roomNumber)
        params.roomNumber = searchFilters.roomNumber;
      const { data } = await reservationService.getRooms(params);
      setResults(data.rooms || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateReservation = async () => {
    try {
      const slot = selectedSlots[0];
      const { data } = await reservationService.createReservation({
        roomId: confirmRoom.id,
        date: filters.date,
        startBlock: slot.startBlock,
        blockCount: slot.blockCount,
        title: reservationTitle || "Reservation",
      });
      setReservationResult(data);
      setConfirmRoom(null);
      setSelectedRoom({
        ...confirmRoom,
        qr: data.qrCodeImage,
        reservationId: data.reservationId,
      });
    } catch (err) {
      const code = err.response?.data?.code;
      const detail = err.response?.data?.detail;
      if (code === "Reservation.DailyLimitExceeded") {
        setBookingError("თქვენ ამოწურეთ დღიური ჯავშნების ლიმიტი");
      } else {
        setBookingError(detail || "დაჯავშნა ვერ მოხერხდა");
      }
    }
  };

  const loadFilters = async () => {
    try {
      const { data } = await reservationService.getFilters();
      setReservationFilters(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingFilters(false);
    }
  };

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSearch = async () => {
    if (!filters.date || !filters.buildingId || !filters.roomType) {
      setBookingError("გთხოვთ შეავსოთ თარიღი, შენობა და ოთახის ტიპი");
      return;
    }
    await loadRooms(filters);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilters({ date: "", buildingId: "", roomType: "", roomNumber: "" });
    setResults([]);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col">
      <Header
        color="#5D9028"
        userName={`${user?.firstName || ""} ${user?.lastName || ""}`}
        onProfileClick={() => navigate("/student-profile")}
      />
      <div className="flex flex-1 min-h-0 ">
        <StudentSidebar activeNav="dashboard" color="#5D9028" />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h2 className="text-gray-800 text-left font-semibold mb-4 text-[18px]">
                გამარჯობა {user?.firstName}, მოძებნე სასურველი ოთახი
              </h2>
              <div className="flex flex-wrap gap-3 items-end">
                <div>
                  <label className="block text-left text-[16px] text-gray-600 mb-1 font-medium">
                    თარიღი
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={filters.date}
                    min={reservationFilters?.minDate}
                    max={reservationFilters?.maxDate}
                    onChange={handleChange}
                    className="border  border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A7A20] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-left text-[16px] text-gray-600 mb-1 font-medium">
                    შენობა
                  </label>
                  <select
                    name="buildingId"
                    value={filters.buildingId}
                    onChange={handleChange}
                    className="border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A7A20] focus:border-transparent min-w-[230px]"
                  >
                    <option value="">შენობა</option>
                    {reservationFilters?.buildings?.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-left text-[16px] text-gray-600 mb-1 font-medium">
                    ოთახის ტიპი
                  </label>
                  <select
                    name="roomType"
                    value={filters.roomType}
                    onChange={handleChange}
                    className="border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A7A20] focus:border-transparent min-w-[190px]"
                  >
                    <option value="">ოთახის ტიპი</option>
                    {reservationFilters?.allowedRoomTypes?.map((t) => (
                      <option key={t.roomType} value={t.roomType}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSearch}
                  className="bg-[#5D9028] hover:bg-[#4A7A20] active:scale-[0.98] text-white px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                >
                  <SearchIcon color="white" />
                  ძებნა
                </button>

                <button
                  onClick={handleClear}
                  className="border border-gray-200 text-gray-500 hover:bg-gray-50 px-5 py-2 rounded-lg text-sm transition flex items-center gap-2"
                >
                  <DeleteIcon color="#5D9028" />
                  გასუფთავება
                </button>
              </div>
            </div>

            {results.length > 0 ? (
              <div>
                <div className="grid grid-cols-3 gap-4">
                  {currentRooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      selectedDate={filters.date}
                      onBook={handleOpenTimeSlots}
                      color="#5D9028"
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    color="#5D9028"
                  />
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl py-16 flex flex-col items-center justify-center shadow-sm">
                <span className="text-5xl mb-4">
                  <SearchIcon color="#4A7A20" className="w-20 h-20" />
                </span>
                <p className="text-[#4A7A20] text-md text-center max-w-xs">
                  გთხოვთ შეავსოთ ფილტრები და დააჭიროთ ძებნას
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
      {bookingError && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-red-50 border border-red-200 text-red-600 px-6 py-3 rounded-xl text-sm shadow-lg cursor-pointer"
          onClick={() => setBookingError("")}
        >
          {bookingError}
        </div>
      )}
      <TimeSlotModal
        open={selectedRoomForTime}
        room={selectedRoomForTime}
        slots={availability?.availableStartBlocks || []}
        selectedSlots={selectedSlots}
        setSelectedSlots={setSelectedSlots}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        onClose={() => setSelectedRoomForTime(null)}
        onContinue={() => {
          setConfirmRoom(selectedRoomForTime);
          setSelectedRoomForTime(null);
        }}
      />
      <BookingConfirmModal
        open={confirmRoom}
        onClose={() => {
          setConfirmRoom(null);
          setBookingError("");
        }}
        onConfirm={handleCreateReservation}
      />
      <SuccessQRModal
        open={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        qr={selectedRoom?.qr}
      />
    </div>
  );
}
