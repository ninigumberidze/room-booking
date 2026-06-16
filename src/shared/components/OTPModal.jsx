export default function OTPModal({
  open,
  otp,
  setOtp,
  error,
  onConfirm,
  onResend,
  resendTimer,
  onClose,
  title = "კოდის შეყვანა",
  description = "გთხოვთ შეიყვანეთ ელ-ფოსტაზე გამოგზავნილი ერთჯერადი კოდი",
}) {
  if (!open) return null;

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl p-8 w-[600px]"
      >
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
          {title}
        </h2>

        <p className="text-gray-600 mb-8 text-center">{description}</p>

        <div className="flex justify-center gap-4 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className={`w-14 h-14 border text-center text-xl rounded-lg ${
                error ? "border-red-500" : "border-[#5D9028]"
              }`}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex justify-between items-center mt-6">
          <button
            disabled={resendTimer > 0}
            onClick={onResend}
            className={`px-4 py-2 rounded-lg border ${
              resendTimer > 0
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-[#5D9028] border-[#5D9028] hover:bg-green-50"
            }`}
          >
            {resendTimer > 0
              ? `კოდის ხელახლა გაგზავნა (${resendTimer})`
              : "კოდის ხელახლა გაგზავნა"}
          </button>

          <button
            onClick={onConfirm}
            className="bg-[#5D9028] text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            დადასტურება
          </button>
        </div>
      </div>
    </div>
  );
}
