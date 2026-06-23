import roomImage from "../../assets/images/Room.png";
import BookingIcon from "../../components/Icons/BookingIcon";
import RoomIcon from "../../components/Icons/RoomIcon";
import DateIcon from "../../components/Icons/DateIcon";

export default function RoomCard({ room, selectedDate, onBook }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
      <div className="flex gap-3 p-4">
        <img
          src={roomImage}
          alt={room.name}
          className="w-[120px] h-[180px] min-w-[180px] object-cover rounded-xl"
        />

        <div className="flex flex-col items-start flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-left text-sm truncate">
            {room.roomNumber} - {room.name}
          </p>

          <p className="text-xs text-gray-400 text-left mb-1.5">
            Building {room.buildingName}
          </p>

          <span
            className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-lg mb-2 ${
              room.hasAvailability
                ? "bg-[#5D9028] text-white"
                : "bg-red-50 text-red-600"
            }`}
          >
            {room.hasAvailability ? "ხელმისაწვდომია" : "დაკავებულია"}
          </span>

          <ul className="space-y-0.5">
            <li className="flex items-center gap-1.5 text-[13px] text-gray-500">
              <RoomIcon color="#5D9028" />
              <span>ტიპი: {room.roomTypeName}</span>
            </li>

            <li className="flex items-center gap-1.5 text-[13px] text-gray-500">
              <DateIcon color="#5D9028" />
              <span>თარიღი: {selectedDate}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-4 pb-4 mt-auto">
        <button
          onClick={() => onBook(room)}
          disabled={!room.hasAvailability}
          className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            room.hasAvailability
              ? "bg-[#5D9028] hover:bg-[#4A7A20] text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <BookingIcon />
          დაჯავშნა
        </button>
      </div>
    </div>
  );
}
