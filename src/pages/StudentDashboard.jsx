import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { reservationService } from "../services/reservationService";
import useAuthStore from "../store/authStore";

import BookIcon from "../components/Icons/BookIcon";
import DeleteIcon from "../components/Icons/DeleteIcon";

import Header from "../components/Layout/Header";
import LogoutModal from "../shared/components/LogoutModal";
import Pagination from "../shared/components/Pagination";
import SearchFilters from "../shared/components/SearchFilters";
import BookingConfirmModal from "../features/booking/BookingConfirmModal";
import SuccessQRModal from "../features/booking/SuccessQRModal";
import TimeSlotModal from "../features/booking/TimeSlotModal";
import Footer from "../components/Layout/Footer";
import { useUser, useLogout } from "../store/authStore";

export default function StudentDashboard() {
  const user = useUser();
  const navigate = useNavigate();

  const logout = useLogout();

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

  const [selectedRoom, setSelectedRoom] = useState(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const roomsPerPage = 6;

  const totalPages = Math.ceil(results.length / roomsPerPage);

  const startIndex = (currentPage - 1) * roomsPerPage;

  const currentRooms = results.slice(startIndex, startIndex + roomsPerPage);
  const [reservationResult, setReservationResult] = useState(null);
  const [reservationFilters, setReservationFilters] = useState(null);

  const [loadingFilters, setLoadingFilters] = useState(true);
  useEffect(() => {
    loadFilters();
  }, []);

  const [availability, setAvailability] = useState(null);

  const handleOpenTimeSlots = async (room) => {
    try {
      const { data } = await reservationService.getAvailability(
        room.id,
        filters.date,
      );

      console.log("AVAILABILITY:", data);

      setAvailability(data);

      setSelectedRoomForTime(room);

      setSelectedSlots([]);
    } catch (error) {
      console.log(error);
    }
  };

  const loadRooms = async (searchFilters = {}) => {
    try {
      const params = {};

      if (searchFilters.date) {
        params.date = searchFilters.date;
      }

      if (searchFilters.buildingId) {
        params.buildingId = searchFilters.buildingId;
      }

      if (searchFilters.roomType) {
        params.roomType = searchFilters.roomType;
      }

      if (searchFilters.roomNumber) {
        params.roomNumber = searchFilters.roomNumber;
      }

      const { data } = await reservationService.getRooms(params);

      setResults(data.rooms || []);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateReservation = async () => {
    try {
      const selectedOption = selectedSlots[0];
      const { data } = await reservationService.createReservation({
        roomId: confirmRoom.id,
        date: filters.date,
        startBlock: selectedOption.startBlock,
        blockCount: selectedOption.blockCount,
        title: reservationTitle || "Reservation",
      });

      console.log("RESERVATION CREATED:", data);

      setReservationResult(data);

      setConfirmRoom(null);

      setSelectedRoom({
        ...confirmRoom,
        qr: data.qrCodeImage,
        reservationId: data.reservationId,
      });
    } catch (err) {
      console.log(err);
      const detail = err.response?.data?.detail;
      const code = err.response?.data?.code;

      if (code === "Reservation.DailyLimitExceeded") {
        alert("თქვენ ამოწურეთ დღიური ჯავშნების ლიმიტი");
      } else {
        alert(detail || "Reservation failed");
      }
    }
  };
  const loadFilters = async () => {
    try {
      const { data } = await reservationService.getFilters();

      setReservationFilters(data);

      setFilters({
        date: "",
        buildingId: "",
        roomType: "",
        roomNumber: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingFilters(false);
    }
  };
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    await loadRooms(filters);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilters({
      date: "",
      buildingId: "",
      roomType: "",
      roomNumber: "",
    });

    setResults([]);

    setCurrentPage(1);
  };

  const closeModal = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="min-h-screen ">
      <Header
        userName={`${user?.firstName || ""} ${user?.lastName || ""}`}
        onProfileClick={() => navigate("/student-profile")}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      <div className="p-6 relative">
        <div className="border border-[#F37A21] rounded-xl p-5 bg-white relative">
          <div className="flex items-center gap-3 z-10 bg-white absolute -top-3 left-5 px-2">
            <BookIcon />

            <h3 className="text-orange-500 font-medium text-left">
              ოთახის ძებნა
            </h3>
          </div>

          <div className="mb-8 flex flex-wrap justify-between items-center">
            <div className="flex flex-wrap gap-4 items-center mt-8">
              <input
                type="date"
                name="date"
                value={filters.date}
                min={reservationFilters?.minDate}
                max={reservationFilters?.maxDate}
                onChange={handleChange}
                className="border border-[#F37A21] px-4 py-2 rounded-lg"
              />
              <select
                name="buildingId"
                value={filters.buildingId}
                onChange={handleChange}
                className="border border-[#F37A21] px-4 py-2 rounded-lg"
              >
                <option value="">კორპუსი</option>

                {reservationFilters?.buildings?.map((building) => (
                  <option key={building.id} value={building.id}>
                    {building.name}
                  </option>
                ))}
              </select>
              <select
                name="roomType"
                value={filters.roomType}
                onChange={handleChange}
                className="border border-[#F37A21] px-4 py-2 rounded-lg"
              >
                <option value="">ოთახის ტიპი</option>

                {reservationFilters?.allowedRoomTypes?.map((type) => (
                  <option key={type.roomType} value={type.roomType}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-4 items-center mt-8">
              <button
                onClick={handleSearch}
                className="bg-[#F37A21] text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                ძებნა
              </button>

              <button
                onClick={handleClear}
                className="border border-orange-500 text-orange-500 px-5 py-2 rounded-lg hover:bg-orange-50 transition flex items-center justify-center"
              >
                <DeleteIcon className="text-[#F37A21]" />
              </button>
            </div>
          </div>

          <div className="border border-[#F37A21] rounded-xl bg-white overflow-hidden">
            {results.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                გთხოვთ შეავსოთ ფილტრები და დააჭიროთ ძებნას
              </div>
            ) : (
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

                      <td className="p-3">{filters.date}</td>

                      <td className="p-3">
                        {room.roomNumber} - {room.name}
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => handleOpenTimeSlots(room)}
                          className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition"
                        >
                          დაჯავშნა
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <BookingConfirmModal
        open={confirmRoom}
        onClose={() => setConfirmRoom(null)}
        onConfirm={handleCreateReservation}
      />

      <SuccessQRModal
        open={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        qr={selectedRoom?.qr}
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
