import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

import BookIcon from "../components/Icons/BookIcon";
import DeleteIcon from "../components/Icons/DeleteIcon";

import Header from "../shared/components/Header";
import LogoutModal from "../shared/components/LogoutModal";
import Pagination from "../shared/components/Pagination";
import SearchFilters from "../shared/components/SearchFilters";
import BookingConfirmModal from "../shared/components/BookingConfirmModal";

const mockRooms = [
  {
    id: 1,
    building: 11,
    roomNumber: "323",
    description: "რესურს ცენტრი",
    date: "2026-05-19",
  },

  {
    id: 2,
    building: 1,
    roomNumber: "324",
    description: "რესურს ცენტრი",
    date: "2026-09-01",
  },

  {
    id: 3,
    building: 2,
    roomNumber: "101",
    description: "ლექციის ოთახი",
    date: "2026-09-02",
  },

  {
    id: 4,
    building: 5,
    roomNumber: "210",
    description: "სემინარის ოთახი",
    date: "2026-09-01",
  },

  {
    id: 5,
    building: 5,
    roomNumber: "210",
    description: "ლექციის ოთახი",
    date: "2026-09-01",
  },

  {
    id: 6,
    building: 5,
    roomNumber: "210",
    description: "სემინარის ოთახი",
    date: "2026-09-01",
  },

  {
    id: 7,
    building: 11,
    roomNumber: "210",
    description: "სემინარის ოთახი",
    date: "2026-09-01",
  },

  {
    id: 8,
    building: 11,
    roomNumber: "210",
    description: "ლექციის ოთახი",
    date: "2026-09-01",
  },
];

const mockStudent = {
  name: "ნინი გუმბერიძე",
};

export default function StudentDashboard() {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const [filters, setFilters] = useState({
    date: "",
    building: "",
    roomNumber: "",
  });

  const [results, setResults] = useState(mockRooms);

  const [confirmRoom, setConfirmRoom] = useState(null);

  const [selectedRoom, setSelectedRoom] = useState(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const roomsPerPage = 6;

  const totalPages = Math.ceil(results.length / roomsPerPage);

  const startIndex = (currentPage - 1) * roomsPerPage;

  const currentRooms = results.slice(startIndex, startIndex + roomsPerPage);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    const filtered = mockRooms.filter((room) => {
      return (
        (!filters.date || room.date === filters.date) &&
        (!filters.building || room.building === Number(filters.building)) &&
        (!filters.roomNumber || room.roomNumber.includes(filters.roomNumber))
      );
    });

    setResults(filtered);

    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilters({
      date: "",
      building: "",
      roomNumber: "",
    });

    setResults(mockRooms);

    setCurrentPage(1);
  };

  const handleBook = async (room) => {
    await new Promise((res) => setTimeout(res, 500));

    const fakeResponse = {
      qrCode:
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BOOKING_" +
        room.id,
    };

    setSelectedRoom({
      ...room,
      qr: fakeResponse.qrCode,
    });

    setConfirmRoom(null);
  };

  const closeModal = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="min-h-screen ">
      <Header
        userName={mockStudent.name}
        onProfileClick={() => navigate("/student-profile")}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      <div className="p-6 relative">
        <div className="border border-[#F37A21] rounded-xl p-5 bg-white relative">
          {/* TITLE */}
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
                onChange={handleChange}
                className="border border-[#F37A21] px-4 py-2 rounded-lg"
              />

              <select
                name="building"
                value={filters.building}
                onChange={handleChange}
                className="border border-[#F37A21] px-4 py-2 rounded-lg"
              >
                <option value="">კორპუსი</option>

                {[...Array(11)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} კორპუსი
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="roomNumber"
                placeholder="ოთახის ნომერი"
                value={filters.roomNumber}
                onChange={handleChange}
                className="border border-[#F37A21] px-4 py-2 rounded-lg"
              />
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
          {/* <SearchFilters
            filters={{
              building: filters.building,
              room: filters.roomNumber,
              date: filters.date,
            }}
            setFilters={(newFilters) =>
              setFilters({
                ...filters,
                building: newFilters.building,
                roomNumber: newFilters.room,
                date: newFilters.date,
              })
            }
            onSearch={handleSearch}
            onClear={handleClear}
          /> */}

          <div className="border border-[#F37A21] rounded-xl bg-white overflow-hidden">
            {results.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-400">
                შედეგი ვერ მოიძებნა
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
                      <td className="p-3">{room.building} კორპუსი</td>

                      <td className="p-3">{room.date}</td>

                      <td className="p-3">
                        {room.roomNumber} - {room.description}
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => setConfirmRoom(room)}
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

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* {confirmRoom && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h3 className="text-xl font-semibold mb-3">ოთახის დაჯავშნა</h3>

            <p className="text-gray-600 mb-6">
              ნამდვილად გსურთ ოთახის დაჯავშნა?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmRoom(null)}
                className="border border-gray-300 px-4 py-2 rounded-lg"
              >
                გაუქმება
              </button>

              <button
                onClick={() => handleBook(confirmRoom)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                დადასტურება
              </button>
            </div>
          </div>
        </div>
      )} */}
      <BookingConfirmModal
        open={confirmRoom}
        onClose={() => setConfirmRoom(null)}
        onConfirm={() => handleBook(confirmRoom)}
      />

      {selectedRoom && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-6 w-[500px] relative"
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-2 text-xl"
            >
              ✕
            </button>

            <div className="flex">
              <div className="w-1/2 text-center border-r pr-4">
                <h3 className="font-semibold text-lg">ოთახი დაჯავშნილია!</h3>

                <p className="text-sm text-gray-500 mt-2">
                  ჯავშნის შესახებ ინფორმაციის ნახვა შესაძლებელია თქვენს
                  პროფილზეც
                </p>
              </div>

              <div className="w-1/2 flex flex-col items-center pl-4">
                <img src={selectedRoom.qr} alt="QR" className="w-32 h-32" />

                <p className="text-xs mt-2 text-center">
                  შეინახეთ არსებული QR კოდი ჯავშნის გასააქტიურებლად
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
