export default function TermsModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl"
      >
        <div className="border-b px-5 py-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#5D9028]">
            მომსახურების პირობები
          </h2>
        </div>

        <div className="px-5 py-4 overflow-y-auto max-h-[60vh] text-sm sm:text-base leading-7 text-gray-700">
          <p className="mb-5 text-left">
            უნივერსიტეტის აუდიტორიების დაჯავშნის სისტემის გამოყენებით,
            მომხმარებელი ეთანხმება მომსახურების პირობებს.
          </p>

          <p className="mb-5 text-left">
            მომხმარებელი პასუხისმგებელია თავისი ანგარიშის უსაფრთხოებაზე და
            ვალდებულია არ გადასცეს ავტორიზაციის მონაცემები სხვა პირს.
          </p>

          <p className="mb-5 text-left">
            მომხმარებლის პერსონალური მონაცემები დაცულია უნივერსიტეტის პოლიტიკის
            შესაბამისად.
          </p>

          <p className="mb-5 text-left">
            სისტემაში რეგისტრაციით, თქვენ ადასტურებთ, რომ გაეცანით და ეთანხმებით
            ყველა პირობას.
          </p>
        </div>

        <div className="border-t p-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#5D9028] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            დახურვა
          </button>
        </div>
      </div>
    </div>
  );
}
