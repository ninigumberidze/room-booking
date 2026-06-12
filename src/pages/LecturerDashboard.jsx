import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import LogoutModal from "../shared/components/LogoutModal";
import useAuthStore from "../store/authStore";
import BookIcon from "../components/Icons/BookIcon";
import Pagination from "../shared/components/Pagination";
import SuccessQRModal from "../features/booking/SuccessQRModal";
import LecturerTimeModal from "../features/booking/LecturerTimeModal";
import SemesterBookingModal from "../features/booking/SemesterBookingModal";
import { reservationService } from "../services/reservationService";
import Footer from "../components/Layout/Footer";
import { useUser, useLogout } from "../store/authStore";

export default function LecturerDashboard() {
  const navigate = useNavigate();
  const user = useUser();
  const logout = useLogout();
  const [filterData, setFilterData] = useState(null);
  const [filters, setFilters] = useState({
    bookingType: "single",
    date: "",
    building: "",
    roomNumber: "",
    weekDay: "",
  });

  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 8;
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

  const [bookingQr, setBookingQr] = useState(null);
  const [semesterSuccess, setSemesterSuccess] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    reservationService
      .getFilters()
      .then(({ data }) => setFilterData(data))
      .catch(console.error);
  }, []);

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
      weekDay: "",
    });
    setResults([]);
    setCurrentPage(1);
  };

  const handleOpenBooking = async (room) => {
    try {
      const { data } = await reservationService.getAvailability(
        room.id,
        filters.date,
      );
      setSelectedRoom(room);
      setAvailableSlots(data.availableStartBlocks || []);
      setSelectedBlocks([]);

      if (filters.bookingType === "semester") {
        setSemesterModal(true);
      } else {
        setShowTimeModal(true);
      }
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
        setBookingQr({ qr: data.qrCodeImage });
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
        setSemesterData({ title: "", weekDay: "", startDate: "", endDate: "" });
        setSemesterSuccess(true);
      }
    } catch (err) {
      console.error(err);
      alert(
        "დაჯავშნა ვერ მოხერხდა — " +
          (err.response?.data?.detail || err.message),
      );
    } finally {
      setIsBooking(false);
    }
  };
  return (
    <div className="min-h-screen">
      <Header
        userName={`${user?.firstName} ${user?.lastName}`}
        onProfileClick={() => navigate("/lecturer-profile")}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      <div className="p-6">
        <div className="border border-[#F37A21] rounded-xl p-5 bg-white relative">
          <div className="flex items-center gap-3 z-10 bg-white absolute -top-3 left-5 px-2">
            <BookIcon />
            <h3 className="text-orange-500 font-medium">
              ლექციის აუდიტორიის ძებნა
            </h3>
          </div>

          <div className="mb-8 flex flex-wrap justify-between items-center">
            <div className="flex flex-wrap gap-4 items-center mt-8">
              <select
                name="bookingType"
                value={filters.bookingType}
                onChange={handleChange}
                className="border border-[#F37A21] px-4 py-2 rounded-lg"
              >
                <option value="single">ერთჯერადი ჯავშანი</option>
                <option value="semester">სემესტრული ჯავშანი</option>
              </select>

              <input
                type="date"
                name="date"
                value={filters.date}
                min={filterData?.minDate}
                max={filterData?.maxDate}
                onChange={handleChange}
                className="border border-[#F37A21] px-4 py-2 rounded-lg"
              />

              <select
                name="building"
                value={filters.building}
                onChange={handleChange}
                className="border border-[#F37A21] px-4 py-2 rounded-lg"
              >
                <option value="">მისამართი</option>
                {filterData?.buildings?.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>

              {filters.bookingType === "semester" && (
                <select
                  name="weekDay"
                  value={filters.weekDay}
                  onChange={handleChange}
                  className="border border-[#F37A21] px-4 py-2 rounded-lg"
                >
                  <option value="">დღე</option>
                  <option value="monday">ორშაბათი</option>
                  <option value="tuesday">სამშაბათი</option>
                  <option value="wednesday">ოთხშაბათი</option>
                  <option value="thursday">ხუთშაბათი</option>
                  <option value="friday">პარასკევი</option>
                </select>
              )}
            </div>

            <div className="flex gap-4 items-center mt-8">
              <button
                onClick={handleSearch}
                className="bg-[#F37A21] text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                ძებნა
              </button>
              <button
                onClick={handleClear}
                className="border border-orange-500 text-orange-500 px-5 py-2 rounded-lg hover:bg-orange-50 transition"
              >
                გასუფთავება
              </button>
            </div>
          </div>

          <div className="border border-[#F37A21] rounded-xl bg-white overflow-hidden">
            {results.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                შედეგი ვერ მოიძებნა
              </div>
            ) : (
              <>
                <table className="w-full">
                  <thead className="bg-orange-400 text-white">
                    <tr>
                      <th className="p-3 text-left">მისამართი</th>
                      <th className="p-3 text-left">თარიღი</th>
                      <th className="p-3 text-left">სივრცის დასახელება</th>
                      <th className="p-3 text-left">დაჯავშნა</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRooms.map((room) => (
                      <tr key={room.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{room.buildingName} კორპუსი</td>
                        <td className="p-3">{filters.date || "—"}</td>
                        <td className="p-3">
                          {room.roomNumber} - {room.name}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleOpenBooking(room)}
                            className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition"
                          >
                            დაჯავშნა
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {confirmRoom && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl p-6 w-[500px]">
            <h3 className="text-xl font-semibold mb-4">აუდიტორიის დაჯავშნა</h3>
            <div className="space-y-2 mb-6">
              <p>ოთახი: {confirmRoom.roomNumber}</p>
              <p>კორპუსი: {confirmRoom.buildingName}</p>
              {filters.bookingType === "single" ? (
                <p>თარიღი: {filters.date}</p>
              ) : (
                <>
                  <p>საგანი: {semesterData.title}</p>
                  <p>დღე: {semesterData.weekDay}</p>
                  <p>
                    პერიოდი: {semesterData.startDate} – {semesterData.endDate}
                  </p>
                </>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmRoom(null)}
                className="border border-gray-300 px-4 py-2 rounded-lg"
              >
                გაუქმება
              </button>
              <button
                onClick={handleBook}
                disabled={isBooking}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                {isBooking ? "..." : "დადასტურება"}
              </button>
            </div>
          </div>
        </div>
      )}

      {semesterSuccess && (
        <div
          onClick={() => setSemesterSuccess(false)}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-xl p-8 w-[500px] text-center">
            <h3 className="text-2xl font-bold mb-3">
              აუდიტორია წარმატებით დაიჯავშნა
            </h3>
            <p className="text-gray-500">ჯავშანის QR გამოგზავნილია მეილზე!</p>
          </div>
        </div>
      )}

      <SuccessQRModal
        open={bookingQr}
        onClose={() => setBookingQr(null)}
        qr={bookingQr?.qr}
        title="აუდიტორია წარმატებით დაჯავშნდა"
      />

      <LecturerTimeModal
        open={showTimeModal}
        room={selectedRoom}
        slots={availableSlots}
        selectedBlocks={selectedBlocks}
        setSelectedBlocks={setSelectedBlocks}
        onClose={() => setShowTimeModal(false)}
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
        onClose={() => setSemesterModal(false)}
        onContinue={() => {
          if (
            !semesterData.title ||
            !semesterData.weekDay ||
            !semesterData.startDate ||
            !semesterData.endDate
          ) {
            alert("შეავსეთ ყველა ველი");
            return;
          }
          if (
            filterData?.maxDate &&
            semesterData.endDate > filterData.maxDate
          ) {
            alert(
              `დასრულების თარიღი არ უნდა აღემატებოდეს ${filterData.maxDate}-ს`,
            );
            return;
          }
          setSemesterModal(false);
          setShowTimeModal(true);
        }}
      />

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
