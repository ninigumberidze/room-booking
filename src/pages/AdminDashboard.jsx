import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Pagination from "../shared/components/Pagination";
import { useUser } from "../store/authStore";
import { reservationService } from "../services/reservationService";
import { USER_TYPE_LABEL } from "../shared/utils/constants";
import SearchIcon from "../components/Icons/SearchIcon";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = useUser();

  const [reservations, setReservations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cancelTarget, setCancelTarget] = useState(null);
  const itemsPerPage = 8;

  const [filters, setFilters] = useState({
    search: "",
    userType: "",
    status: "",
    roomType: "",
  });

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const { data } = await reservationService.getAdminReservations();
      setReservations(data.reservations || []);
      setFiltered(data.reservations || []);
    } catch (err) {
      setError("ჯავშნების ჩატვირთვა ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const result = reservations.filter((r) => {
      const matchSearch =
        !filters.search ||
        r.userFirstName?.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.userLastName?.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.userEmail?.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.roomNumber?.includes(filters.search);

      const matchUserType =
        !filters.userType || r.userType === Number(filters.userType);

      const matchStatus = !filters.status || r.status === filters.status;

      const matchRoomType =
        !filters.roomType || r.roomType === Number(filters.roomType);

      return matchSearch && matchUserType && matchStatus && matchRoomType;
    });

    setFiltered(result);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({ search: "", userType: "", status: "", roomType: "" });
    setFiltered(reservations);
    setCurrentPage(1);
  };

  const handleCancel = async () => {
    if (!cancelTarget) return;
    try {
      if (cancelTarget.isRecurring && cancelTarget.reservationSeriesId) {
        await reservationService.deleteSeriesManagement(
          cancelTarget.reservationSeriesId,
        );
      } else {
        await reservationService.deleteReservationManagement(cancelTarget.id);
      }
      await loadReservations();
      setCancelTarget(null);
    } catch (err) {
      setError(err.response?.data?.detail || "გაუქმება ვერ მოხერხდა");
      setCancelTarget(null);
    }
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen">
      <Header
        userName={`${user?.firstName || ""} ${user?.lastName || ""}`}
        onProfileClick={() => navigate("/admin-profile")}
        color="#5D9028"
      />

      <div className="p-6 ">
        <div className="border-2 border-[#5D9028] rounded-xl p-5 bg-white relative mb-6">
          <div className="flex items-center gap-2 absolute -top-3 left-5 bg-white px-2">
            <SearchIcon />
            <h3 className="text-[#5D9028] font-medium">საძიებო პანელი</h3>
          </div>

          <div className="flex flex-wrap gap-4 items-center mt-4 justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative">
                <input
                  name="search"
                  placeholder="მეილი"
                  value={filters.search}
                  onChange={handleChange}
                  className="border-2 border-[#5D9028] rounded-lg px-4 py-2 pr-10 w-64"
                />
                <span className="absolute right-3 top-2.5 text-[#5D9028]">
                  <SearchIcon />
                </span>
              </div>

              <select
                name="userType"
                value={filters.userType}
                onChange={handleChange}
                className="border-2 border-[#5D9028] rounded-lg px-4 py-2"
              >
                <option value="">მომხმარებლის ტიპი</option>
                <option value="0">სტუდენტი</option>
                <option value="1">ლექტორი</option>
              </select>

              <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="border-2 border-[#5D9028] rounded-lg px-4 py-2"
              >
                <option value="">სტატუსი</option>
                <option value="Active">აქტიური</option>
                <option value="Cancelled">გაუქმებული</option>
              </select>

              <select
                name="roomType"
                value={filters.roomType}
                onChange={handleChange}
                className="border-2 border-[#5D9028] rounded-lg px-4 py-2"
              >
                <option value="">ოთახის ტიპი</option>
                <option value="1">სალექციო</option>
                <option value="2">საბიბლიოთეკო</option>
                <option value="3">სალაბორატორიო</option>
                <option value="4">პრაქტიკული</option>
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSearch}
                className="bg-[#5D9028] text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                ძებნა
              </button>
              <button
                onClick={handleReset}
                className="border-2 border-[#5D9028] text-[#5D9028] px-5 py-2 rounded-lg hover:bg-green-50 transition"
              >
                გასუფთავება
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm flex items-center justify-between">
            {error}
            <button
              onClick={() => setError("")}
              className="text-red-400 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        )}

        <div className="border-2 border-[#5D9028] rounded-xl bg-white overflow-hidden">
          {loading ? (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              იტვირთება...
            </div>
          ) : filtered.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              შედეგი ვერ მოიძებნა
            </div>
          ) : (
            <>
              <table className="w-full text-left">
                <thead className="bg-[#5D9028] text-white">
                  <tr>
                    <th className="p-3">მომხმარებელი</th>
                    <th className="p-3">ტიპი</th>
                    <th className="p-3">ოთახი</th>
                    <th className="p-3">თარიღი</th>
                    <th className="p-3">დრო</th>
                    <th className="p-3">სტატუსი</th>
                    <th className="p-3">გაუქმება</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((r) => (
                    <tr key={r.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium text-sm">
                          {r.userFirstName} {r.userLastName}
                        </div>
                        <div className="text-xs text-gray-400">
                          {r.userEmail}
                        </div>
                      </td>
                      <td className="p-3 text-sm">
                        {USER_TYPE_LABEL[r.userType] ?? r.userType}
                      </td>
                      <td className="p-3 text-sm">
                        <div>
                          {r.roomNumber} - {r.roomName}
                        </div>
                        <div className="text-xs text-gray-400">
                          {r.buildingName}
                        </div>
                      </td>
                      <td className="p-3 text-sm">{r.date}</td>
                      <td className="p-3 text-sm">
                        {r.startsAt} - {r.endsAt}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded text-sm text-white  ${
                            r.status === "Active"
                              ? "bg-green-500"
                              : "bg-gray-300 cursor-not-allowed"
                          }`}
                        >
                          {r.status === "Active" ? "აქტიური" : "გაუქმებული"}
                        </span>
                        {r.isRecurring && (
                          <span className="ml-1 px-2 py-1 rounded text-xs bg-blue-100 text-blue-700">
                            სემ
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          disabled={!r.canCancel}
                          onClick={() => setCancelTarget(r)}
                          className={`px-3 py-1 rounded text-sm text-white ${
                            r.canCancel
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-gray-300 cursor-not-allowed"
                          }`}
                        >
                          გაუქმება
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

      {cancelTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[450px]">
            <h3 className="text-lg font-semibold mb-3">ჯავშნის გაუქმება</h3>
            <p className="text-gray-600 mb-2 text-sm">
              {cancelTarget.userFirstName} {cancelTarget.userLastName} —{" "}
              {cancelTarget.roomNumber} ოთახი, {cancelTarget.date}
            </p>
            {cancelTarget.isRecurring && (
              <p className="text-orange-600 text-sm mb-4">
                ეს სემესტრული ჯავშანია — გაუქმდება მთელი სერია.
              </p>
            )}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setCancelTarget(null)}
                className="border border-gray-300 px-4 py-2 rounded-lg text-sm"
              >
                გათიშვა
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
              >
                დადასტურება
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
