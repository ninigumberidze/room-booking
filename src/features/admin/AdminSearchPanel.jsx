import SearchIcon from "../../components/Icons/SearchIcon";

export default function AdminSearchPanel({
  filters,
  onChange,
  onSearch,
  onReset,
}) {
  return (
    <div className="border-2 border-[#5D9028] rounded-xl p-5 bg-white relative mb-6">
      <div className="flex items-center gap-2 absolute -top-3 left-5 bg-white px-2">
        <SearchIcon color="#5D9028" />
        <h3 className="text-[#5D9028] font-medium">საძიებო პანელი</h3>
      </div>

      <div className="mt-6 flex flex-col xl:flex-row gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 flex-1">
          <div className="relative">
            <input
              name="search"
              placeholder="მეილი"
              value={filters.search}
              onChange={onChange}
              className="border-2 border-[#5D9028] rounded-lg px-4 py-2 pr-10 w-full"
            />

            <span className="absolute right-3 top-2.5 text-[#5D9028]">
              <SearchIcon color="#5D9028" />
            </span>
          </div>

          <select
            name="userType"
            value={filters.userType}
            onChange={onChange}
            className=" w-full border-2 border-[#5D9028] rounded-lg px-4 py-2"
          >
            <option value="">მომხმარებლის ტიპი</option>
            <option value="0">სტუდენტი</option>
            <option value="1">ლექტორი</option>
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={onChange}
            className=" w-full border-2 border-[#5D9028] rounded-lg px-4 py-2"
          >
            <option value="">სტატუსი</option>
            <option value="Active">აქტიური</option>
            <option value="Cancelled">გაუქმებული</option>
          </select>

          <select
            name="roomType"
            value={filters.roomType}
            onChange={onChange}
            className="w-full border-2 border-[#5D9028] rounded-lg px-4 py-2"
          >
            <option value="">ოთახის ტიპი</option>
            <option value="1">სალექციო</option>
            <option value="2">საბიბლიოთეკო</option>
            <option value="3">სალაბორატორიო</option>
            <option value="4">პრაქტიკული</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 xl:self-end">
          <button
            onClick={onSearch}
            className="w-full bg-[#5D9028] text-white w-full sm:w-auto px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            ძებნა
          </button>

          <button
            onClick={onReset}
            className=" w-full border-2 border-[#5D9028] text-[#5D9028] w-full sm:w-auto px-6 py-2 rounded-lg hover:bg-green-50 transition"
          >
            გასუფთავება
          </button>
        </div>
      </div>
    </div>
  );
}
