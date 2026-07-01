export default function LogoutModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[95%] max-w-sm">
        <h3 className="text-xl text-black font-bold mb-3">სისტემიდან გასვლა</h3>

        <p className="text-gray-600 mb-6">ნამდვილად გსურთ სისტემიდან გასვლა?</p>

        <div className="flex justify-between gap-3">
          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-2 rounded-lg"
          >
            გაუქმება
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            გასვლა
          </button>
        </div>
      </div>
    </div>
  );
}
