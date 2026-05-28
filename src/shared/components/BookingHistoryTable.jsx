import Pagination from "./Pagination";

export default function BookingHistoryTable({
  bookings,
  currentPage,
  totalPages,
  setCurrentPage,
  onSelectBooking,
  showType = false,
}) {
  return (
    <div className="p-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">ჯავშნის კოდი</th>

            <th className="p-3 text-left">ჯავშნის თარიღი</th>

            <th className="p-3 text-left">ჯავშნის ადგილი</th>

            {showType && <th className="p-3 text-left">ტიპი</th>}

            <th className="p-3 text-left">QR კოდი</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{booking.id}</td>

              <td className="p-3">{booking.date}</td>

              <td className="p-3">{booking.room}</td>

              {showType && <td className="p-3">{booking.type}</td>}

              <td className="p-3">
                <button
                  disabled={!booking.active}
                  onClick={() => onSelectBooking(booking)}
                  className={`px-10 py-2 rounded text-white ${
                    booking.active
                      ? "bg-[#1A71B7] hover:bg-[#1A71B7]/80 transition"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  QR კოდი
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
    </div>
  );
}
