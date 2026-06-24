import roomImage from "../../assets/images/Room.png";
import BookingIcon from "../../components/Icons/BookingIcon";
import RoomIcon from "../../components/Icons/RoomIcon";
import DateIcon from "../../components/Icons/DateIcon";

export default function RoomCard({
  room,
  selectedDate,
  onBook,
  color = "#5D9028",
}) {
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
            className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-lg mb-2"
            style={
              room.hasAvailability
                ? { backgroundColor: color, color: "#fff" }
                : { backgroundColor: "#FEF2F2", color: "#DC2626" }
            }
          >
            {room.hasAvailability ? "ხელმისაწვდომია" : "დაკავებულია"}
          </span>

          <ul className="space-y-0.5">
            <li className="flex items-center gap-1.5 text-[13px] text-gray-500">
              <RoomIcon color={color} />
              <span>ტიპი: {room.roomTypeName}</span>
            </li>
            <li className="flex items-center gap-1.5 text-[13px] text-gray-500">
              <DateIcon color={color} />
              <span>თარიღი: {selectedDate}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-4 pb-4 mt-auto">
        <button
          onClick={() => onBook(room)}
          disabled={!room.hasAvailability}
          className="w-full py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white"
          style={room.hasAvailability ? { backgroundColor: color } : {}}
        >
          <BookingIcon />
          დაჯავშნა
        </button>
      </div>
    </div>
  );
}
