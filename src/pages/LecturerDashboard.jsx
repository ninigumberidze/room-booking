import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../shared/components/Header";
import LogoutModal from "../shared/components/LogoutModal";
import useAuthStore from "../store/authStore";
import ProjectLogo from "../components/Icons/ProjectLogo";
import BookIcon from "../components/Icons/BookIcon";
import Pagination from "../shared/components/Pagination";

const mockRooms = [
  {
    id: 1,
    building: 11,
    roomNumber: "323",
    description: "რესურს ცენტრი",

    date: "2026-09-01",

    startTime: "10:00",
    endTime: "12:00",
  },

  {
    id: 2,
    building: 5,
    roomNumber: "210",
    description: "ლექციის ოთახი",

    date: "2026-09-01",

    startTime: "13:00",
    endTime: "15:00",
  },

  {
    id: 3,
    building: 2,
    roomNumber: "101",
    description: "სემინარის ოთახი",

    date: "2026-09-02",

    startTime: "09:00",
    endTime: "11:00",
  },

  {
    id: 4,
    building: 9,
    roomNumber: "404",
    description: "რესურს ცენტრი",

    date: "2026-09-03",

    startTime: "15:00",
    endTime: "17:00",
  },

  {
    id: 5,
    building: 1,
    roomNumber: "201",
    description: "ლექციის ოთახი",

    date: "2026-09-03",

    startTime: "11:00",
    endTime: "13:00",
  },

  {
    id: 6,
    building: 3,
    roomNumber: "120",
    description: "სემინარის ოთახი",

    date: "2026-09-04",

    startTime: "14:00",
    endTime: "16:00",
  },

  {
    id: 7,
    building: 10,
    roomNumber: "500",
    description: "რესურს ცენტრი",

    date: "2026-09-05",

    startTime: "08:00",
    endTime: "10:00",
  },
  {
    id: 8,
    building: 1,
    roomNumber: "201",
    description: "ლექციის ოთახი",

    date: "2026-09-03",

    startTime: "11:00",
    endTime: "13:00",
  },

  {
    id: 9,
    building: 3,
    roomNumber: "120",
    description: "სემინარის ოთახი",

    date: "2026-09-04",

    startTime: "14:00",
    endTime: "16:00",
  },

  {
    id: 10,
    building: 10,
    roomNumber: "500",
    description: "რესურს ცენტრი",

    date: "2026-09-05",

    startTime: "08:00",
    endTime: "10:00",
  },
];

const mockLecturer = {
  name: "ნინი ლექტორაძე",
};

export default function LecturerDashboard() {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const [filters, setFilters] = useState({
    bookingType: "single",

    date: "",

    building: "",

    roomNumber: "",

    weekDay: "",

    startTime: "",

    endTime: "",
  });

  const [results, setResults] = useState(mockRooms);

  const [confirmRoom, setConfirmRoom] = useState(null);

  const [successModal, setSuccessModal] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const roomsPerPage = 8;

  const totalPages = Math.ceil(results.length / roomsPerPage);

  const startIndex = (currentPage - 1) * roomsPerPage;

  const currentRooms = results.slice(startIndex, startIndex + roomsPerPage);

  const [bookingQr, setBookingQr] = useState(null);

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
        (!filters.roomNumber || room.roomNumber.includes(filters.roomNumber)) &&
        (!filters.startTime || room.startTime >= filters.startTime) &&
        (!filters.endTime || room.endTime <= filters.endTime)
      );
    });

    setResults(filtered);

    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilters({
      bookingType: "single",

      date: "",

      building: "",

      roomNumber: "",

      weekDay: "",

      startTime: "",

      endTime: "",
    });

    setResults(mockRooms);

    setCurrentPage(1);
  };

  const handleBook = async () => {
    let bookingPayload = {};

    if (filters.bookingType === "single") {
      bookingPayload = {
        type: "single",

        roomId: confirmRoom.id,

        date: filters.date,

        startTime: filters.startTime,

        endTime: filters.endTime,
      };
    }

    if (filters.bookingType === "semester") {
      bookingPayload = {
        type: "semester",

        roomId: confirmRoom.id,

        weekDay: filters.weekDay,

        startTime: filters.startTime,

        endTime: filters.endTime,

        startDate: "2026-09-01",

        endDate: "2027-02-01",
      };
    }

    console.log("BOOKING PAYLOAD:", bookingPayload);

    await new Promise((res) => setTimeout(res, 700));

    setConfirmRoom(null);

    setSuccessModal(true);

    setBookingQr({
      id: "LECTURER-BOOK-" + Math.floor(Math.random() * 100000),
    });
  };

  return (
    <div className="min-h-screen ">
      <Header
        userName={mockLecturer.name}
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

              {filters.bookingType === "semester" && (
                <select
                  name="weekDay"
                  value={filters.weekDay}
                  onChange={handleChange}
                  className="border border-[#F37A21] px-4 py-2 rounded-lg"
                >
                  <option value="">დღე</option>

                  <option value="ორშაბათი">ორშაბათი</option>

                  <option value="სამშაბათი">სამშაბათი</option>

                  <option value="ოთხშაბათი">ოთხშაბათი</option>

                  <option value="ხუთშაბათი">ხუთშაბათი</option>

                  <option value="პარასკევი">პარასკევი</option>
                </select>
              )}

              <input
                type="time"
                name="startTime"
                value={filters.startTime}
                onChange={handleChange}
                className="border border-[#F37A21] px-4 py-2 rounded-lg"
              />

              <input
                type="time"
                name="endTime"
                value={filters.endTime}
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

                      <th className="p-3 text-left">დრო</th>

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
                          {room.startTime} - {room.endTime}
                        </td>

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

            <div className="space-y-3 mb-6">
              <p>ოთახი: {confirmRoom.roomNumber}</p>

              <p>კორპუსი: {confirmRoom.building}</p>

              <p>
                დრო: {filters.startTime} - {filters.endTime}
              </p>

              {filters.bookingType === "single" ? (
                <p>თარიღი: {filters.date}</p>
              ) : (
                <>
                  <p>დღე: {filters.weekDay}</p>

                  <p>სემესტრული ჯავშანი</p>
                </>
              )}
            </div>

            <div className="flex justify-end gap-3">
              {/* CANCEL */}
              <button
                onClick={() => setConfirmRoom(null)}
                className="border border-gray-300 px-4 py-2 rounded-lg"
              >
                გაუქმება
              </button>

              <button
                onClick={handleBook}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                დადასტურება
              </button>
            </div>
          </div>
        </div>
      )}

      {successModal && (
        <div
          onClick={() => setSuccessModal(false)}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-xl p-8 w-[500px] text-center">
            <h3 className="text-2xl font-bold mb-3">
              {filters.bookingType === "semester"
                ? "აუდიტორია წარმატებით დაჯავშნდა სემესტრისთვის"
                : "აუდიტორია წარმატებით დაჯავშნდა"}
            </h3>

            <p className="text-gray-500">ჯავშანი წარმატებით დაემატა</p>
          </div>
        </div>
      )}
      {bookingQr && (
        <div
          onClick={() => setBookingQr(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-8 rounded-lg text-center"
          >
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${bookingQr.id}`}
              alt="QR"
              className="mx-auto"
            />
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
