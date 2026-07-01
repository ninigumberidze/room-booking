export default function SuccessQRModal({
  open,
  onClose,
  qr,
  title = "ოთახი დაჯავშნილია!",
  description = "ჯავშნის შესახებ ინფორმაციის ნახვა შესაძლებელია თქვენს პროფილზეც",
}) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl p-6 w-[500px]"
      >
        <div className="flex">
          <div
            className={`text-center ${qr ? "w-1/2 border-r pr-4" : "w-full"}`}
          >
            <h3 className="font-semibold text-black text-lg">{title}</h3>
            <p className="text-sm text-gray-500 mt-2">{description}</p>
          </div>

          {qr && (
            <div className="w-1/2 flex flex-col items-center pl-4">
              <img src={`data:image/png;base64,${qr}`} alt="QR Code" />
              <p className="text-xs mt-2 text-center">
                შეინახეთ არსებული QR კოდი
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
