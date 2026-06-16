import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import ProjectLogo from "../components/Icons/ProjectLogo";
import SearchIcon from "../components/Icons/SearchIcon";
import LogoutModal from "../shared/components/LogoutModal";
import Footer from "../components/Layout/Footer";
import { useUser } from "../store/authStore";
import { useLogout } from "../shared/hooks/useLogout";
//  Mock
const mockAdmin = {
  firstName: "ნინიკო",
  lastName: "ადმინიკო",
  birthDate: "01/01/2000",
  status: "სისტემის ადმინისტრატორი",
  email: "test@tsu.ge",
  phone: "+995 555121212",
};
const mockRooms = [
  {
    id: 1,
    number: "1",
    faculty: "კომპ მეც",
    direction: "ზუსტები",
    isFree: true,
  },
  {
    id: 2,
    number: "2",
    faculty: "ბიზნესი",
    direction: "ეკონომიკა",
    isFree: false,
  },
  {
    id: 3,
    number: "3",
    faculty: "სამედიცინო",
    direction: "ბიოლოგები",
    isFree: true,
  },
  {
    id: 4,
    number: "4",
    faculty: "IT",
    direction: "AI",
    isFree: true,
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: "",
    faculty: "",
    direction: "",
    onlyFree: false,
  });
  const logoutModal = useLogout();
  const [results, setResults] = useState(mockRooms);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSearch = () => {
    const filtered = mockRooms.filter((room) => {
      return (
        (!filters.search ||
          room.number.toLowerCase().includes(filters.search.toLowerCase())) &&
        (!filters.faculty || room.faculty === filters.faculty) &&
        (!filters.direction || room.direction === filters.direction) &&
        (!filters.onlyFree || room.isFree)
      );
    });

    setResults(filtered);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      faculty: "",
      direction: "",
      onlyFree: false,
    });

    setResults(mockRooms);
  };

  return (
    <div className="min-h-screen ">
      <div className="bg-[#5D9028] text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ProjectLogo />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin-profile")}
            className="border-2 border-white px-4 py-2 rounded-lg hover:bg-white hover:text-green-700 transition"
          >
            {mockAdmin.firstName} {mockAdmin.lastName}
          </button>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-[#C72E31] px-4 py-3 rounded-lg hover:bg-red-600 transition"
          >
            გასვლა
          </button>
        </div>
      </div>

      <div className="p-6  relative ">
        <div className="border-2 border-[#5D9028] rounded-xl p-10 pb-12 pt-12 mb-6 bg-white relative">
          <div className="flex items-center gap-2 absolute -top-3 left-5 bg-white px-2">
            <SearchIcon />
            <h3 className="text-[#C72E31] font-medium">საძიებო პანელი</h3>
          </div>
          <div className="flex flex-wrap  justify-between items-center">
            <div className="flex flex-wrap gap-8  items-center">
              <div className="relative">
                <input
                  name="search"
                  placeholder="ძებნა..."
                  value={filters.search}
                  onChange={handleChange}
                  className="border-2 border-[#5D9028] rounded-lg px-4 py-2 pr-10"
                />

                <span className="absolute right-3 top-2.5 text-[#5D9028]">
                  {<SearchIcon />}
                </span>
              </div>

              <select
                name="faculty"
                value={filters.faculty}
                onChange={handleChange}
                className="border-2 border-[#5D9028]   rounded-lg px-4 py-2"
              >
                <option value="">ფაკულტეტი</option>

                <option value="IT">კომპ მეც</option>

                <option value="Business">ბიზნესი</option>
              </select>

              <select
                name="direction"
                value={filters.direction}
                onChange={handleChange}
                className="border-2 border-[#5D9028]  rounded-lg px-4 py-2"
              >
                <option value="">მიმართულება</option>

                <option value="Software">ზუსტები</option>

                <option value="Management">ეკონომიკა</option>

                <option value="AI">AI</option>
              </select>

              <label className="flex items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="onlyFree"
                  checked={filters.onlyFree}
                  onChange={handleChange}
                  className="w-7 h-7 accent-[#C72E31] cursor-pointer"
                />

                <span>თავისუფალი აუდიტორია</span>
              </label>
            </div>
            <div className="flex gap-8">
              <button
                onClick={handleSearch}
                className="bg-[#C72E31] text-white px-4 py-2 rounded-lg hover:bg-[#A52A2A] transition"
              >
                ძებნა
              </button>

              <button
                onClick={handleReset}
                className="border-2  border-[#5D9028] text-[#5D9028] px-4 py-2 rounded-lg hover:bg-[#A52A2A] transition"
              >
                გასუფთავება
              </button>
            </div>
          </div>
        </div>

        <div className="border-2 border-[#5D9028] rounded-xl p-8 bg-white">
          {results.length === 0 ? (
            <p className="text-[#5D9028] text-center py-20">
              შედეგი ვერ მოიძებნა
            </p>
          ) : (
            <table className="w-full text-left  border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3">ოთახი</th>

                  <th className="p-3">ფაკულტეტი</th>

                  <th className="p-3">მიმართულება</th>

                  <th className="p-3">სტატუსი</th>
                </tr>
              </thead>

              <tbody>
                {results.map((room) => (
                  <tr key={room.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{room.number}</td>

                    <td className="p-3">{room.faculty}</td>

                    <td className="p-3">{room.direction}</td>

                    <td className="p-3">
                      <span
                        className={`p-2 rounded text-white text-sm ${
                          room.isFree ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {room.isFree ? "თავისუფალია" : "დაკავებულია"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
