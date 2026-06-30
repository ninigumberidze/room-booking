export default function SuccessModal({
  open,
  onClose,
  title = "ოპერაცია წარმატებით დასრულდა",
  description = "",
  buttonText = "დახურვა",
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-xl text-center"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-[#5D9028] mb-4">
          {title}
        </h2>

        {description && (
          <p className="text-gray-600 text-sm sm:text-base mb-8">
            {description}
          </p>
        )}

        <button
          onClick={onClose}
          className="w-full sm:w-auto bg-[#5D9028] text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
