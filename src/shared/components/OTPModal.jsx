export default function OTPModal({
  open,
  otp,
  setOtp,

  onConfirm,
  onResend,
  resendTimer,
  onClose,
  error,
  setError,
  title = "კოდის შეყვანა",
  description = "გთხოვთ შეიყვანეთ ელ-ფოსტაზე გამოგზავნილი ერთჯერადი კოდი",
}) {
  if (!open) return null;

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    if (error) {
      setError("");
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-[95%] max-w-[600px] p-5 sm:p-6 md:p-8 shadow-xl"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-green-700 text-center mb-3">
          {title}
        </h2>

        <p className="text-gray-600 text-sm sm:text-base text-center mb-6">
          {description}
        </p>

        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-lg sm:text-xl font-semibold text-center rounded-lg border-2 transition focus:outline-none
                focus:ring-2 ${error ? "border-red-500 focus:ring-red-300" : "border-[#5D9028] focus:ring-green-300"}`}
            />
          ))}
        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 border border-red-300 px-4 py-3">
            <p className="text-sm text-red-600 text-center font-medium">
              {error}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center mt-6">
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
