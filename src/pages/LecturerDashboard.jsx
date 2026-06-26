import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import { useUser } from "../store/authStore";
import Pagination from "../shared/components/Pagination";
import SuccessQRModal from "../features/booking/SuccessQRModal";
import BookingConfirmModal from "../features/booking/BookingConfirmModal";
import LecturerTimeModal from "../features/booking/LecturerTimeModal";
import SemesterBookingModal from "../features/booking/SemesterBookingModal";
import { reservationService } from "../services/reservationService";
import SearchIcon from "../components/Icons/SearchIcon";
import DeleteIcon from "../components/Icons/DeleteIcon";
import LecturerSidebar from "../components/Layout/LecturerSidebar";
import RoomCard from "../features/booking/RoomCard";

export default function LecturerDashboard() {
  const navigate = useNavigate();
  const user = useUser();

  const [bookingError, setBookingError] = useState("");
  const [filterData, setFilterData] = useState(null);
  const [filters, setFilters] = useState({
    bookingType: "single",
    date: "",
    building: "",
    roomNumber: "",
  });
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 6;
  const totalPages = Math.ceil(results.length / roomsPerPage);
  const currentRooms = results.slice(
    (currentPage - 1) * roomsPerPage,
    currentPage * roomsPerPage,
  );

  const [isBooking, setIsBooking] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [semesterModal, setSemesterModal] = useState(false);
  const [confirmRoom, setConfirmRoom] = useState(null);
  const [semesterData, setSemesterData] = useState({
    title: "",
    weekDay: "",
    startDate: "",
    endDate: "",
  });
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    reservationService
      .getFilters()
      .then(({ data }) => setFilterData(data))
      .catch(console.error);
  }, []);

  const handleCloseSemesterModal = () => {
    setSemesterData({
      title: "",
      weekDay: "",
      startDate: "",
      endDate: "",
    });

    setSemesterModal(false);

    setSelectedRoom(null);
    setAvailableSlots([]);
    setSelectedBlocks([]);
  };
  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleSearch = async () => {
    try {
      const { data } = await reservationService.getRooms({
        date: filters.date || undefined,
        buildingId: filters.building || undefined,
        roomNumber: filters.roomNumber || undefined,
        roomType: 1,
      });
      setResults(data.rooms || []);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setFilters({
      bookingType: "single",
      date: "",
      building: "",
      roomNumber: "",
    });
    setResults([]);
    setCurrentPage(1);
  };

  const handleOpenBooking = async (room) => {
    if (!room.hasAvailability) return;
    try {
      const { data } = await reservationService.getAvailability(
        room.id,
        filters.date,
      );
      setSelectedRoom(room);
      setAvailableSlots(data.availableStartBlocks || []);
      setSelectedBlocks([]);
      filters.bookingType === "semester"
        ? setSemesterModal(true)
        : setShowTimeModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBook = async () => {
    if (isBooking) return;
    setIsBooking(true);
    const startBlock = Math.min(...confirmRoom.selectedBlocks);
    const blockCount = confirmRoom.selectedBlocks.length;
    try {
      if (filters.bookingType === "single") {
        const { data } = await reservationService.createReservation({
          roomId: confirmRoom.id,
          date: filters.date,
          startBlock,
          blockCount,
          title: "Lecture",
        });
        setConfirmRoom(null);
        setSelectedRoom(null);
        setAvailableSlots([]);
        setSelectedBlocks([]);

        setSuccessData({
          qr: data.qrCodeImage,
          semester: false,
        });
      } else {
        await reservationService.createRecurringReservation({
          roomId: confirmRoom.id,
          title: semesterData.title,
          weekDay: semesterData.weekDay,
          startDate: semesterData.startDate,
          endDate: semesterData.endDate,
          startBlock,
          blockCount,
        });
        setConfirmRoom(null);
        setSemesterData({
          title: "",
          weekDay: "",
          startDate: "",
          endDate: "",
        });

        setSelectedRoom(null);
        setAvailableSlots([]);
        setSelectedBlocks([]);
        setSuccessData({ qr: null, semester: true });
      }
    } catch (err) {
      setBookingError(
        "დაჯავშნა ვერ მოხერხდა — " +
          (err.response?.data?.detail || err.message),
      );
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col">
      <Header
        color="#1A71B7"
        userName={`${user?.firstName || ""} ${user?.lastName || ""}`}
        onProfileClick={() => navigate("/lecturer-profile")}
      />

      <div className="flex flex-1 min-h-0">
        <LecturerSidebar
          activeNav="dashboard"
          color="#1A71B7"
          hoverColor="#0c3454"
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h2 className="text-gray-800 text-left font-semibold mb-4 text-[18px]">
                გამარჯობა {user?.firstName}, მოძებნე სასურველი აუდიტორია
              </h2>
              <div className="flex flex-wrap gap-3 items-end">
                <div>
                  <label className="block text-left text-[16px] text-gray-600 mb-1 font-medium">
                    ჯავშნის ტიპი
                  </label>
                  <select
                    name="bookingType"
                    value={filters.bookingType}
                    onChange={handleChange}
                    className="border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1A71B7] focus:border-transparent"
                  >
                    <option value="single">ერთჯერადი</option>
                    <option value="semester">სემესტრული</option>
                  </select>
                </div>

                <div>
                  <label className="block text-left text-[16px] text-gray-600 mb-1 font-medium">
                    თარიღი
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={filters.date}
                    min={filterData?.minDate}
                    max={filterData?.maxDate}
                    onChange={handleChange}
                    className="border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1A71B7] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-left text-[16px] text-gray-600 mb-1 font-medium">
                    შენობა
                  </label>
                  <select
                    name="building"
                    value={filters.building}
                    onChange={handleChange}
                    className="border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1A71B7] focus:border-transparent min-w-[230px]"
                  >
                    <option value="">შენობა</option>
                    {filterData?.buildings?.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSearch}
                  className="bg-[#1A71B7] hover:bg-blue-800 active:scale-[0.98] text-white px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                >
                  <SearchIcon color="white" />
                  ძებნა
                </button>

                <button
                  onClick={handleClear}
                  className="border border-gray-200 text-gray-500 hover:bg-gray-50 px-5 py-2 rounded-lg text-sm transition flex items-center gap-2"
                >
                  <DeleteIcon color="#1A71B7" />
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
                      onBook={handleOpenBooking}
                      color="#1A71B7"
                    />
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    color="#1A71B7"
                  />
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl py-16 flex flex-col items-center justify-center shadow-sm">
                <SearchIcon color="#1A71B7" className="w-12 h-12 mb-4" />
                <p className=" text-md text-center max-w-xs">
                  გთხოვთ შეავსოთ ფილტრები და დააჭიროთ ძებნას
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {bookingError && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-red-50 border border-red-200 text-red-600 px-6 py-3 rounded-xl text-sm shadow-lg cursor-pointer flex items-center gap-4"
          onClick={() => setBookingError("")}
        >
          {bookingError}
          <span className="text-red-400 font-medium">✕</span>
        </div>
      )}

      <LecturerTimeModal
        open={showTimeModal}
        room={selectedRoom}
        slots={availableSlots}
        selectedBlocks={selectedBlocks}
        setSelectedBlocks={setSelectedBlocks}
        onClose={() => {
          setShowTimeModal(false);

          setSemesterData({
            title: "",
            weekDay: "",
            startDate: "",
            endDate: "",
          });

          setSelectedRoom(null);
          setAvailableSlots([]);
          setSelectedBlocks([]);
        }}
        onContinue={(blocks) => {
          setShowTimeModal(false);
          setConfirmRoom({ ...selectedRoom, selectedBlocks: blocks });
        }}
      />

      <SemesterBookingModal
        open={semesterModal}
        data={semesterData}
        setData={setSemesterData}
        maxDate={filterData?.maxDate}
        onClose={handleCloseSemesterModal}
        onContinue={() => {
          if (
            !semesterData.title ||
            !semesterData.weekDay ||
            !semesterData.startDate ||
            !semesterData.endDate
          ) {
            setBookingError("შეავსეთ ყველა ველი");
            return;
          }
          if (
            filterData?.maxDate &&
            semesterData.endDate > filterData.maxDate
          ) {
            setBookingError(
              `დასრულების თარიღი არ უნდა აღემატებოდეს ${filterData.maxDate}-ს`,
            );
            return;
          }
          setBookingError("");
          setSemesterModal(false);
          setShowTimeModal(true);
        }}
      />

      <BookingConfirmModal
        open={!!confirmRoom}
        color="#1A71B7"
        title="აუდიტორიის დაჯავშნა"
        description={
          filters.bookingType === "single"
            ? `ოთახი ${confirmRoom?.roomNumber} — ${filters.date}`
            : `${semesterData.title}  · ${semesterData.startDate} – ${semesterData.endDate}`
        }
        onClose={() => {
          setConfirmRoom(null);
          setBookingError("");
          setSelectedBlocks([]);
        }}
        onConfirm={handleBook}
      />

      <SuccessQRModal
        open={!!successData}
        onClose={() => setSuccessData(null)}
        qr={successData?.qr}
        title="აუდიტორია წარმატებით დაიჯავშნა!"
        description={
          successData?.semester
            ? "ჯავშნის QR გამოგზავნილია მეილზე"
            : "ჯავშნის შესახებ ინფორმაციის ნახვა შესაძლებელია თქვენს პროფილზეც"
        }
      />
    </div>
  );
}
