import Pagination from "../../shared/components/Pagination";

export default function BookingHistoryTable({
  bookings,
  currentPage,
  totalPages,
  setCurrentPage,
  onSelectBooking,
  onCancelBooking,
  showType = false,
}) {
  return (
    <div className="p-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">ჯავშნის კოდი</th>

            <th className="p-3 text-left">ჯავშნის თარიღი</th>
            <th className="p-3 text-left">ჯავშნის დრო</th>

            <th className="p-3 text-left">ჯავშნის ადგილი</th>

            {showType && <th className="p-3 text-left">ტიპი</th>}

            <th className="p-3 text-left">QR კოდი</th>
            <th className="p-3 text-left">მოქმედება</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map(
            (booking) => (
              console.log("BOOKING:", booking),
              (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{booking.id}</td>

                  <td className="p-3">{booking.date}</td>
                  <td className="p-3">
                    {booking.startsAt} - {booking.endsAt}
                  </td>

                  <td className="p-3">
                    Room {booking.roomNumber}- Building {booking.buildingId}
                  </td>

                  {showType && <td className="p-3">{booking.roomTypeName}</td>}

                  <td className="p-3">
                    <button
                      disabled={!booking.canCancel}
                      onClick={() => onSelectBooking(booking)}
                      className={`px-10 py-2 rounded ${
                        booking.canCancel
                          ? "text-white bg-[#1A71B7] hover:bg-[#1A71B7]/80 transition"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {booking.canCancel
                        ? "QR კოდი ვალიდურია"
                        : "ჯავშანი გაუქმებულია"}
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      disabled={!booking.canCancel}
                      onClick={() => onCancelBooking(booking)}
                      className={`px-4 py-2 rounded ${
                        booking.canCancel
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {booking.canCancel
                        ? "ჯავშნის გაუქმება"
                        : "ჯავშანი გაუქმებულია"}
                    </button>
                  </td>
                </tr>
              )
            ),
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        color="#1A71B7"
      />
    </div>
  );
}
