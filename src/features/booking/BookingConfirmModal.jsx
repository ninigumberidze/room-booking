export default function BookingConfirmModal({
  open,
  onClose,
  onConfirm,
  reservationTitle,
  setReservationTitle,
  title = "ოთახის დაჯავშნა",
  description = "ნამდვილად გსურთ ოთახის დაჯავშნა?",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white rounded-xl p-6 w-[400px]">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>

        <p className="text-gray-600 mb-6">{description}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          >
            გაუქმება
          </button>

          <button
            onClick={onConfirm}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            დადასტურება
          </button>
        </div>
      </div>
    </div>
  );
}
