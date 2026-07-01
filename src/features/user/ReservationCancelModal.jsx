export default function ReservationCancelModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[92%] max-w-md">
        <h3 className="text-xl  font-bold text-black mb-3">ჯავშნის გაუქმება</h3>

        <p className="text-gray-600 mb-6">ნამდვილად გსურთ ჯავშნის გაუქმება?</p>

        <div className="flex justify-between gap-3">
          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          >
            დაბრუნება
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            გაუქმება
          </button>
        </div>
      </div>
    </div>
  );
}
