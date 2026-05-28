export default function SearchFilters({
  filters,
  setFilters,
  onSearch,
  onClear,
  showSemester = false,
}) {
  const buildings = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
  ];

  return (
    <div className="bg-white rounded-lg p-6 border-2 border-[#1A71B7] mb-6">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-left mb-2 text-sm font-medium">
            კორპუსი
          </label>

          <select
            value={filters.building}
            onChange={(e) =>
              setFilters({
                ...filters,
                building: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="">ყველა</option>

            {buildings.map((building) => (
              <option key={building} value={building}>
                {building}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-left mb-2 text-sm font-medium">
            ოთახი
          </label>

          <input
            type="text"
            value={filters.room}
            onChange={(e) =>
              setFilters({
                ...filters,
                room: e.target.value,
              })
            }
            placeholder="ოთახის ნომერი"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block text-left mb-2 text-sm font-medium">
            თარიღი
          </label>

          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              setFilters({
                ...filters,
                date: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        {showSemester && (
          <div>
            <label className="block text-left mb-2 text-sm font-medium">
              ჯავშნის ტიპი
            </label>

            <select
              value={filters.type}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  type: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            >
              <option value="">ყველა</option>

              <option value="ერთჯერადი">ერთჯერადი</option>

              <option value="სემესტრული">სემესტრული</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClear}
          className="border-2 border-[#1A71B7] text-[#1A71B7] px-6 py-2 rounded-lg hover:bg-[#1A71B7] hover:text-white transition"
        >
          გასუფთავება
        </button>

        <button
          onClick={onSearch}
          className="bg-[#1A71B7] text-white px-6 py-2 rounded-lg hover:bg-[#155d96] transition"
        >
          ძიება
        </button>
      </div>
    </div>
  );
}
